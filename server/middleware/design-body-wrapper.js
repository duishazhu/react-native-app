module.exports = () => async (ctx, next) => {
  await next();
  if (ctx.header['with-wrapper'] === '1' && ctx.status === 200) {
    if (ctx.body && typeof ctx.body === 'object') {
      ctx.body = { success: true, data: ctx.body };
    }
  }
};
