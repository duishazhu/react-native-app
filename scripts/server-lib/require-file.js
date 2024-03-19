/* eslint-disable import/no-dynamic-require */

module.exports = function (filename) {
  if (require.cache[filename]) {
    delete require.cache[filename];
  }
  return require(filename);
};
