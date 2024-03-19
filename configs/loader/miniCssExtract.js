/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  loader: {
    loader: MiniCssExtractPlugin.loader,
  },
  cjsLoader: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      esModule: false, // 此配置项用于修复装修系统样式加载问题
    },
  },
};
