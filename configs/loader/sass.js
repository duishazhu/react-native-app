/* eslint-disable @typescript-eslint/no-var-requires */

const sass = require('sass');
const pathConfig = require('../default-config');

module.exports = {
  loader: {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      implementation: sass,
      sassOptions: {
        includePaths: [pathConfig.resolve('node_modules/compass-mixins/lib')],
      },
    },
  },
};
