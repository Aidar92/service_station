/* eslint-disable */
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-enable */

const param = {
  title: 'Service station',
  entryPath: './src/main.tsx',
  distPath: './dist',
  templatePath: './src/assets/html/template.html',
};

const common = (isProd) => ({
  entry: param.entryPath,
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, param.distPath),
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~api': path.resolve(__dirname, 'src/api'),
      '~context': path.resolve(__dirname, 'src/context'),
      '~features': path.resolve(__dirname, 'src/features'),
      '~libs': path.resolve(__dirname, 'src/libs'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~types': path.resolve(__dirname, 'types'),
      '~ui': path.resolve(__dirname, 'src/ui'),
    },
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.scss',
      '.sass',
      '.css',
      '.yaml',
      '.yml',
    ],
    fallback: {
      stream: false,
    },
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(yaml|yml)$/, use: ['json-loader', 'yaml-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
      { test: /\.(js)$/, use: 'source-map-loader', enforce: 'pre' },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProd,
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // array of paths
              resources: ['./src/assets/css/variables.scss'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { title: param.title },
      template: param.templatePath,
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
});

module.exports = { common };
