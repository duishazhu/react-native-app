/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const minimist = require('minimist');
const helper = require('./helper');

function init() {
  const argv = minimist(process.argv.slice(2));
  const cliMode = argv.mode; // 指定脚本
  // 获取项目脚手架默认配置
  helper.getDevConfig();
  try {
    require(`./${cliMode}`); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

init();
