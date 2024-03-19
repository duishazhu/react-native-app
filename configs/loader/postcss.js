// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require('../../scripts/helper');

const defaultPlugins = ['postcss-preset-env'];

const configPlugins = helper.getDevConfig().plugins || {};

const plugins = defaultPlugins.concat(configPlugins.postcss || []);

module.exports = {
  loader: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins,
      },
    },
  },
};
