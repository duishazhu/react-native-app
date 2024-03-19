module.exports = (opts) => async (ctx, next) => {
  await next();

  if (opts.envs) {
    const { accessControlAllowOrigin, broProjectDomain } = opts.envs;
    if (broProjectDomain) {
      ctx.set('Access-Control-Allow-Origin', accessControlAllowOrigin || '');
      ctx.set('Content-Security-Policy', `frame-ancestors ${broProjectDomain || ''}`);
      ctx.set('X-Frame-Options', `allow-from ${broProjectDomain || ''}`);
    }
  }
};
