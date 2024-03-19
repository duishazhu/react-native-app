/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const clearModule = require('clear-module');
const chokidar = require('chokidar');
const globby = require('globby');
const path = require('path');

const fs = require('fs');

const defaultConfig = require('../../configs/default-config');

const libPath = defaultConfig.resolve('lib');

let watcher = null;
let watching = false;

module.exports = function (restart, config) {
  function watchCallback() {
    if (watching) {
      const source = path.resolve(__dirname, '../../');
      const paths = globby.sync(`{lib,**/server,**/design}/**/*`, {
        cwd: source,
        ignore: ['node_modules/**/*'],
      });
      // 清除require.cache缓存
      paths.forEach((item) => clearModule.single(path.join(source, item)));
      restart(config);
    }
  }

  const serverDir = defaultConfig.resolve(`mall-${process.env.TARGET_PROJECT}/server/`);
  const design = defaultConfig.resolve(`mall-${process.env.TARGET_PROJECT}/client/design/design.js`);
  if (!fs.existsSync(libPath)) {
    fs.mkdirSync(libPath);
  }

  watcher = chokidar.watch([serverDir, defaultConfig.resolve('lib/'), design]);

  watcher
    .on('ready', () => {
      watching = true;
    })
    .on('add', watchCallback)
    .on('addDir', watchCallback)
    .on('change', watchCallback);
};
