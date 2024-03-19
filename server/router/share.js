const OSS = require('ali-oss');
const { drawItemSharePicture, pushOss, fetchFonts, loadStaticImage } = require('../share-helper');

module.exports = ({ router, options }) => {
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

  // 获取字体
  fetchFonts();

  // 加载所需静态图片
  loadStaticImage();

  // 普通商品
  router.get('/api/herd/share/item', async (ctx) => {
    if (!ossStore) {
      ctx.body = { success: false, error: 'OSS初始化失败!' };
      return;
    }

    try {
      const picture = await drawItemSharePicture('item', ctx.query);
      const data = await pushOss(picture, ossStore);
      ctx.body = { success: true, data };
    } catch (e) {
      ctx.body = { success: false, error: e.message };
      return;
    }
  });

  // 拼团
  router.get('/api/herd/share/group', async (ctx) => {
    if (!ossStore) {
      ctx.body = { success: false, error: 'OSS初始化失败!' };
      return;
    }

    try {
      const picture = await drawItemSharePicture('group', ctx.query);
      const data = await pushOss(picture, ossStore);
      ctx.body = { success: true, data };
    } catch (e) {
      ctx.body = { success: false, error: e.message };
      return;
    }
  });

  // 秒杀
  router.get('/api/herd/share/secKill', async (ctx) => {
    if (!ossStore) {
      ctx.body = { success: false, error: 'OSS初始化失败!' };
      return;
    }

    try {
      const picture = await drawItemSharePicture('secKill', ctx.query);
      const data = await pushOss(picture, ossStore);
      ctx.body = { success: true, data };
    } catch (e) {
      ctx.body = { success: false, error: e.message };
      return;
    }
  });
};
