/* eslint-disable @typescript-eslint/no-var-requires */
const OSS = require('ali-oss');
const { Buffer } = require('buffer');
const { stringify } = require('qs');
const request = require('./request');
// const { drawAcodePicture, drawHouseSharePicture, pushOss } = require('../share-helper');

module.exports = ({ router, options }) => {
  const accessToken = {};
  const appid = process.env.WX_APP_ID;
  const secret = process.env.WX_APP_SECRET;

  let ossStore;
  if (options.upload && options.upload.enable && options.upload.points.length) {
    const ossList = options.upload.points || [];
    const ossParams = ossList.some((it) => it.node === 'enable')
      ? ossList.find((it) => it.node === 'enable')
      : ossList[0];

    ossStore = new OSS({
      secure: true,
      region: ossParams.region,
      accessKeyId: ossParams.accessKeyId,
      accessKeySecret: ossParams.accessKeySecret,
      bucket: ossParams.bucket,
    });
  }

  // 获取access_token
  router.get('/api/herd/get-access-token', async (ctx) => {
    const currentTimestamp = new Date().getTime();
    try {
      if (!accessToken.value || currentTimestamp >= accessToken.expire) {
        const rep = await request('https://api.weixin.qq.com/cgi-bin/token', {
          method: 'GET',
          useUnwrap: false,
          data: {
            grant_type: 'client_credential',
            appid: appid,
            secret: secret,
          },
        });
        if (rep?.access_token) {
          accessToken.value = rep?.access_token;
          accessToken.expire = rep?.expires_in * 1000 + currentTimestamp;
        } else {
          ctx.status = 500;
          ctx.body = { success: false, error: rep?.errmsg };
          return;
        }
      }
    } catch (e) {
      const { response } = e || {};
      const { status: respStatus } = response || {};
      if (respStatus != null) {
        ctx.status = respStatus;
      }
      ctx.body = { success: false, error: e.message };
      return;
    }

    ctx.body = { success: true, data: accessToken.value };
  });

  // 获取手机号
  router.post('/api/herd/get-phone-number', async (ctx) => {
    const { wxCode } = ctx.request.body;
    try {
      const wxAccessToken = await ctx.invokeService('getAccessToken');
      const rep = await request(
        `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${wxAccessToken}`,
        {
          method: 'POST',
          useUnwrap: false,
          data: {
            code: wxCode,
          },
        }
      );
      if (rep?.phone_info?.purePhoneNumber) {
        ctx.body = {
          success: true,
          data: { phoneNumber: rep?.phone_info?.purePhoneNumber, countryCode: rep?.phone_info?.countryCode },
        };
      } else {
        ctx.status = 500;
        ctx.body = { success: false, error: rep?.errmsg };
      }
    } catch (e) {
      ctx.status = 500;
      ctx.body = { success: false, error: e?.msg?.error };
    }
  });

  // // 获取小程序码
  // router.post('/api/herd/get-acode', async (ctx) => {
  //   const { pageParams, page } = ctx.request.body;
  //   try {
  //     // oss初始化失败、没有生效配置拦截
  //     if (!ossStore) {
  //       ctx.status = 500;
  //       ctx.body = { success: false, error: 'OSS初始化失败!' };
  //       return;
  //     }
  //     const wxAccessToken = await ctx.invokeService('getAccessToken');
  //     const res = await request(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${wxAccessToken}`, {
  //       method: 'POST',
  //       dataType: 'buffer',
  //       useUnwrap: false,
  //       data: JSON.stringify({
  //         page,
  //         scene: stringify(pageParams || {}),
  //         env_version: 'trial',
  //         check_path: false,
  //       }),
  //     });
  //     if (Buffer.isBuffer(res)) {
  //       const canvas = await drawAcodePicture({ wxacode: res });
  //       const pictureUrl = await pushOss(canvas, ossStore);
  //       ctx.body = { success: true, data: pictureUrl };
  //     } else {
  //       ctx.status = 500;
  //       ctx.body = { success: false, error: res.errmsg };
  //     }
  //   } catch (e) {
  //     const { response } = e || {};
  //     const { status: respStatus } = response || {};
  //     if (respStatus != null) {
  //       ctx.status = respStatus;
  //     }
  //     ctx.body = { success: false, error: e.message };
  //   }
  // });

  // // 获取分享海报
  // router.post('/api/herd/get-share-bill', async (ctx) => {
  //   const { pageParams, page, shareContent } = ctx.request.body;
  //   try {
  //     // oss初始化失败、没有生效配置拦截
  //     if (!ossStore) {
  //       ctx.status = 500;
  //       ctx.body = { success: false, error: 'OSS初始化失败!' };
  //       return;
  //     }
  //     const wxAccessToken = await ctx.invokeService('getAccessToken');
  //     const res = await request(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${wxAccessToken}`, {
  //       method: 'POST',
  //       dataType: 'buffer',
  //       useUnwrap: false,
  //       data: JSON.stringify({
  //         page,
  //         scene: stringify(pageParams || {}),
  //         env_version: 'trial',
  //         check_path: false,
  //       }),
  //     });
  //     const { mainImage, username, mobile, avatar } = shareContent || {};
  //     if (Buffer.isBuffer(res)) {
  //       const canvas = await drawHouseSharePicture({
  //         mainImage,
  //         username,
  //         mobile,
  //         avatar,
  //         wxacode: res,
  //       });
  //       const pictureUrl = await pushOss(canvas, ossStore);
  //       ctx.body = { success: true, data: pictureUrl };
  //     } else {
  //       ctx.status = 500;
  //       ctx.body = { success: false, error: res.errmsg };
  //     }
  //   } catch (e) {
  //     const { response } = e || {};
  //     const { status: respStatus } = response || {};
  //     if (respStatus != null) {
  //       ctx.status = respStatus;
  //     }
  //     ctx.body = { success: false, error: e.message };
  //   }
  // });
};
