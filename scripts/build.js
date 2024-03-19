/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const fs = require('fs');
const execSync = require('child_process').execSync;
const helper = require('./helper');

// 注入编译期环境变量
process.env.NODE_ENV = 'production'; // 强制

const prodConfig = require('../configs/webpack.prod');
const designConfig = require('../configs/webpack.design.prod');
const prodLayoutConfig = require('../configs/webpack.prod.design.layout');

// 打包队列
const queue = [
  { compile: webpack(designConfig), name: '1/3 prod design' },
  { compile: webpack(prodConfig), name: '2/3 prod' },
  { compile: webpack(prodLayoutConfig), name: '3/3 prod layout' },
];

function preBuild() {
  console.log('-----------------------------------');
  console.log(`Current node version: ${execSync('node -v')}`);
  console.log(`Current npm  version: v${execSync('npm -v')}`);
  console.log('-----------------------------------');
  /** file-remove-begin */
  if (helper._targetProject) {
    console.log(`--------> Using herd config: mall-${helper._targetProject}/dicefile-docker.js`);

    const herdConfigPath = `${__dirname}/../mall-${helper._targetProject}/dicefile-docker.js`;

    if (fs.existsSync(herdConfigPath)) {
      fs.copyFileSync(herdConfigPath, `${__dirname}/../dicefile-docker.js`);
      return;
    }
    console.error('无此配置文件');
    process.exit(1);
  }
  /** file-remove-end */
}
function build() {
  if (!queue.length) {
    console.log('✅ 打包完成');
    return;
  }
  const { compile, name } = queue.shift();
  console.log(`${name}打包`);
  compile.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(`============  webpack build ${name} error ============`);
      helper.packLog(err, stats);
      process.exit(1);
    }
    console.log(`============  webpack build ${name} complete ============`);
    console.log(`build ${name} 耗时：${stats.endTime - stats.startTime}ms`);
    helper.packLog(err, stats);
    build();
  });
}
preBuild();
build();
