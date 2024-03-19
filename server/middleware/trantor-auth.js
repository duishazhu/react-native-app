// 去重
function getResources(origin) {
  const map = {};
  origin.forEach((item) => {
    map[item] = true;
  });
  return Object.keys(map);
}

const reg = /^\/(system\/sites|design\/|api\/design)/i;
const excludeReg = /^\/api\/design\/(page\/(list|design-data)|batch|pageCategory)/i;
const shopDesignPathReg = /^\/design\/shops\/\d+\/.+.png$/;

const DESIGN_SHOP_COOKIE_NAME = 'dscn';

module.exports = () => async (ctx, next) => {
  // 如果用户已经登录， 拿权限信息
  ctx.state.currentUserAuthInfo = { roles: [] };

  if (!excludeReg.test(ctx.path) && reg.test(ctx.path)) {
    try {
      // 判断是否已经登录
      const user = await ctx.invokeService('getUser');

      if (!user || !user.id) {
        throw new Error('user not login');
      }
      ctx.state.currentUser = {
        ...user,
        name: user.username || user.nickname || user.id,
      };

      // 获取权限
      const response = await ctx.invokeService('getTrantorAuthResource', { userId: user.id }, { cache: true });
      const resources = response.Menu;

      if (resources.find((r) => r.indexOf('app_manage_site_design') > -1)) {
        if (resources.find((r) => r.indexOf('app_manage_site_shop_design') > -1)) {
          // 装修店铺ID处理
          const shopIdInCookie = ctx.cookies.get(DESIGN_SHOP_COOKIE_NAME) || 4001;
          // 更新上下文shopId
          ctx.state.siteOwner = shopIdInCookie;
          ctx.herdContext.shopId = shopIdInCookie;
          ctx.cookies.set('siteOwner', shopIdInCookie);
        }

        ctx.state.currentUserAuthInfo = { roles: [], resources: getResources(resources) };
      } else throw new Error('用户无权限');
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      return;
    }
  }

  // 处理装修静态图片加载逻辑
  if (shopDesignPathReg.test(ctx.path)) {
    ctx.url = ctx.url.replace(/^\/design\/shops\/\d+/, '/system/sites');
  }

  await next();
};
