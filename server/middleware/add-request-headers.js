function addHeaderKey(ctx, key, value) {
  ctx.headers[key] = value;
  ctx.herdContext.__INVOKER_HEADER__[key] = value;
}

const bbcReg = /\/api\/(basic|item|trade)\/(.+)/;
const noticeReg = /\/api\/basic\/notice\/(.+)/;

// herd proxy会导致accept-language header丢失，需要丢到__INVOKER_HEADER__覆盖
module.exports = () => async (ctx, next) => {
  const acceptLanguage = ctx.header['accept-language'] || ctx.cookies.get('lng');

  addHeaderKey(ctx, 'Accept-Language', acceptLanguage);

  if (bbcReg.test(ctx.path) && !noticeReg.test(ctx.path)) {
    addHeaderKey(ctx, 'Touch-Point', process.env.TOUCH_POINT || 'MOBILE');
    addHeaderKey(ctx, 'Trantor-AppKey', process.env.BBC_APP_KEY || 'bbc');
  } else {
    addHeaderKey(ctx, 'Trantor-AppKey', process.env.MEMBER_APP_KEY || 'ce');
  }

  await next();
};
