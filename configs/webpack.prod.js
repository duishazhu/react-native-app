/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge').merge;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

const pathConfig = require('./default-config');
const webpackCommon = require('./webpack.common');

const mergedConfig = merge(webpackCommon, {
  entry: {
    app: pathConfig.entryPath,
  },
  mode: 'production',
  stats: {
    preset: 'verbose',
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: require('os').cpus().length - 1,
      }),
    ],
    splitChunks: {
      name: 'vender',
      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      maxSize: 10000000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          priority: 101,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-loadable|isomorphic-fetch|antd)[\\/]/,
        },
        'common-components': {
          minChunks: 2,
          test: /components/,
          name: 'common-components',
          priority: 100,
          reuseExistingChunk: true,
        },
        'formatjs-polyfill': {
          chunks: 'async',
          test: /(getcanonicallocales|relativetimeformat|pluralrules|numberformat)[\\/](polyfill|locale-data)/,
          minChunks: 1,
          name: 'formatjs-polyfill',
          priority: 91,
          reuseExistingChunk: true,
        },
        'async-commons': {
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 90,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: '在线商城',
      filename: pathConfig.resolve('public/index.html'),
      template: pathConfig.resolve('src/views/index.ejs'),
      taOptions: {
        enable: process.env.TA_ENABLE === true || process.env.TA_ENABLE === 'true',
        environment: process.env.TA_ENV,
      },
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/runtime-.+[.]js$/],
    }),
  ],
});

module.exports = mergedConfig;
