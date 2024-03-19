/* eslint-disable @typescript-eslint/no-var-requires */
const { documentIgnorePaths } = require('../../config');

// 匹配开头
const regexp = new RegExp(`^(${documentIgnorePaths.join('|')})`);

module.exports = function (path) {
  return regexp.test(path);
};
