module.exports = function addEnvironments() {
  return async function addEnvironmentsMiddleware(ctx, next) {
    ctx.herdContext._ENVIRONMENTS_CONFIG = {};
    await next();
  };
};
