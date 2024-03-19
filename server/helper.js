const domainReg = /^.*\.(\w+\.\w+)(:\d{1,5})?$/;

/**
 * 获取主域名
 */
function getDomain(host, options) {
  const { cookieDomain } = (options && options.session) || {};
  return cookieDomain || host.replace(domainReg, '$1');
}

module.exports = {
  getDomain,
};
