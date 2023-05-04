/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { common } = require('./webpack.common.js');
/* eslint-enable */

const extConfig = {
  mode: 'production',
};

const extPlugins = [
  new CleanWebpackPlugin({ verbose: true }),
  new CopyPlugin({
    patterns: [{ from: 'public' }],
  }),
  // new BundleAnalyzerPlugin(),
];

const commonConfig = common(true);

module.exports = {
  ...commonConfig,
  ...extConfig,
  plugins: [...commonConfig.plugins, ...extPlugins],
};
