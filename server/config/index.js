// document ignore paths： 非html响应的地址前缀（不支持正则和path-to-regex）
const documentIgnorePaths = [
  '/api/',
  '/assets/',
  '/favicon.ico',
  '/design/',
  '/system/',
  '/health/check',
  '/auth/resources',
];

// 阻止缓存的 key 和 value (需要nginx静态化同时配合)
const disableCache = { key: '_.disable_cache._', value: 'on' };

module.exports = {
  documentIgnorePaths,
  disableCache,
};
