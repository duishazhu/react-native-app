/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const _ = require('lodash');

const ROOT_BASE_PATH = path.join(__dirname, '../'); // 指定项目根目录

// 获取项目根目录文件绝对路径
function resolve(...pathNames) {
  const paths = [ROOT_BASE_PATH, ...pathNames];
  return path.resolve(...paths);
}

// 项目根目录
const entryPath = resolve(`index.js`);
const outputPath = resolve('public');
// 生成srm的extension
function generateExtensions() {
  let prefixList = ['web'];
  const suffixList = ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx'];
  const extensions = [];
  prefixList.forEach((prefix) => {
    suffixList.forEach((it) => {
      extensions.push(`.${prefix}${it}`);
    });
  });
  // 带前缀的应该比不带前缀的权重高 例如 web.ts 应该是比 js 权重高
  extensions.push(...suffixList);
  extensions.push('.cjs', '.ios.js', '.scss', '.less');
  return extensions;
}

const isDevMode = process.env.NODE_ENV !== 'production';

const config = {
  resolve,
  basePath: ROOT_BASE_PATH,
  entryPath,
  outputPath,
  publicPath: process.env.CDN_PATH || '/',
  resolveModules: [
    resolve('src'),
    resolve('src/components'),
    resolve('origin/src'),
    resolve('origin/src/components'),
    'node_modules',
    './node_modules',
  ],
  resolveAlias: {
    'react-native': 'react-native-web',
  },
  babelIncludes: [
    resolve('origin/src'),
    resolve('src'),
    resolve('node_modules/@terminus'),
    resolve('node_modules/@react-navigation'),
    resolve('node_modules/react-native-reanimated'),
    resolve('node_modules/react-native-gesture-handler'),
    resolve('node_modules/react-native-animatable'),
    resolve('node_modules/@react-native-community/async-storage'),
    resolve('node_modules/react-native-extended-stylesheet'),
    resolve('node_modules/query-string'),
    resolve('node_modules/nanoid'),
    resolve('node_modules/escape-string-regexp'),
    resolve('node_modules/strict-uri-encode'),
    resolve('node_modules/split-on-first'),
    resolve('node_modules/react-native-iphone-x-helper'),
    resolve('node_modules/wicg-inert'),
    resolve('node_modules/react-native-safe-area-context'),
    resolve('node_modules/react-native-screens'),
  ],
  extensions: generateExtensions(),
  isDevMode,
};

module.exports = config; // eslint-disable-line
