/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge').merge;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const fs = require('fs');
const pathConfig = require('./default-config');
const webpackCommon = require('./webpack.common');

const entryPaths = ['webpack-hot-middleware/client', pathConfig.entryPath];

module.exports = merge(webpackCommon, {
  name: 'app',
  entry: {
    app: entryPaths,
  },
  mode: 'development',
  devtool: 'eval-source-map',
  cache: {
    /** file-remove-begin */
    name: process.env.TARGET_SUB_PROJECT || process.env.TARGET_PROJECT,
    /** file-remove-end */
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
      tsconfig: [pathConfig.resolve('tsconfig.json'), pathConfig.resolve('jsconfig.json')].filter((f) =>
        fs.existsSync(f)
      ),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: false,
    }),
    new WebpackBar({ name: 'web dev' }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      title: '在线商城',
      filename: pathConfig.resolve('public/index.html'),
      template: pathConfig.resolve('src/views/index.ejs'),
      taOptions: {
        enable: process.env.TA_ENABLE === true || process.env.TA_ENABLE === 'true',
        environment: process.env.TA_ENV,
      },
    }),
  ],
});
