module.exports = async ({ router, options, useBeforeMiddleware }) => {
  router.get('/health/check', async (ctx) => {
    ctx.body = { success: true };
    if (ctx.session && ctx.session.disable) {
      ctx.session.disable();
    }
  });

  if (process.env.ENABLE_HERD_LOG) {
    useBeforeMiddleware(async (ctx, next) => {
      console.log(ctx.url, ctx.headers['user-agent']);
      await next();
    });
  }
};
