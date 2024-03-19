/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const _defaultsDeep = require('lodash/defaultsDeep');

let configCache;
function getDevConfig() {
  if (configCache) return configCache;

  if (fs.existsSync(path.resolve(__dirname, `../dev.config.js`))) {
    const customConfig = require(`../dev.config.js`); // eslint-disable-line
    configCache = _defaultsDeep(
      customConfig,
      require(`../dev-config.js`)({ useEnv: customConfig.useEnv || 'dev', ...customConfig })
    ); // eslint-disable-line
    return configCache;
  }
  configCache = require(`../dev-config.js`)({ useEnv: 'test' }); // eslint-disable-line
  return configCache;
}

module.exports = {
  packLog(err, stats, onlyError = false) {
    if (err) {
      console.log('An error occurred while packaging %>_<%   %>_<%  %>_<%');
      console.log(
        stats.toString({
          colors: true,
          assets: true,
          errors: true,
          warnings: true,
        })
      );
      return;
    }

    if (onlyError) {
      if (stats.compilation.errors.length) {
        console.log(
          stats.toString({
            colors: true,
            all: false,
            assets: false,
            errors: true,
            warnings: false,
          })
        );
      }
      return;
    }
    console.log(
      stats.toString({
        colors: true,
        /** fallback value for stats options when an option is not defined (has precedence over local webpack defaults) */
        all: false,
        /** Add asset Information */
        assets: true,
        errors: true,
        warnings: true,
      })
    );
  },
  getDevConfig,
};
