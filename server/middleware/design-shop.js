const { pathToRegexp } = require('path-to-regexp');
const helper = require('../helper');

const { getDomain } = helper;

const shopDesignPathReg = /^\/design\/shops\/\d+$/;
const pathReg = pathToRegexp('/design/shops/:shopId');
const DESIGN_SHOP_COOKIE_NAME = 'dscn';

const SHOP_CHANGE_PAGE = () => `<!DOCTYPE html>
<html style="height: 100%">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <title>在线商城</title>
    <meta name="description" content="" />
  </head>
  <body style="height: 100%;background-color: #f1f1f1">
    <div style="margin: 100px auto; padding: 20px; width: 600px; border: 1px solid #ddd; background-color: #fff; font-size: 16px;">
      <div>每次只能同时装修一个店铺，当前店铺与上次装修店铺不一致，请<span style="color: #f00">关闭其他装修页面并重新选择店铺进行装修</span></div>
    </div>
  </body>
</html>

`;

module.exports =
  ({ options }) =>
  async (ctx, next) => {
    if (shopDesignPathReg.test(ctx.path)) {
      const shopIdInPath = pathReg.exec(ctx.path)[1];
      const shopIdInCookie = ctx.cookies.get(DESIGN_SHOP_COOKIE_NAME);

      if (!shopIdInCookie) {
        // 更新cookie
        ctx.cookies.set(DESIGN_SHOP_COOKIE_NAME, shopIdInPath, {
          domain: getDomain(ctx.host, options),
        });
      } else if (shopIdInPath !== shopIdInCookie) {
        // 店铺ID变更：需要清除cookie
        ctx.cookies.set(DESIGN_SHOP_COOKIE_NAME, null, {
          domain: getDomain(ctx.host, options),
          expires: new Date(0),
        });
        // 提示用户shopId变更
        ctx.body = SHOP_CHANGE_PAGE(shopIdInPath);
        return;
      }

      // 渲染站点管理页面
      ctx.url = options.designer.siteManageUrl;
    }

    await next();
  };
