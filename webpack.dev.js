/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { common } = require('./webpack.common.js');
const CircularDependencyPlugin = require('circular-dependency-plugin');
/* eslint-enable */

const extConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    https: false,
    port: 8080,
    watchContentBase: false,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
      {
        context: ['/api'],
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};

const extPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd(),
  }),
];

const commonConfig = common(false);

module.exports = {
  ...commonConfig,
  ...extConfig,
  plugins: [...commonConfig.plugins, ...extPlugins],
};
