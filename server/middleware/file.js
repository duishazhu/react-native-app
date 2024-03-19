/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('../router/request');

module.exports = function file(opts) {
  return async function (ctx, next) {
    if (ctx.request.path === '/api/design/resourceCategory/list') {
      const { siteId } = ctx.request.query;
      ctx.body = [
        {
          createdAt: '2020-06-12T08:19:21.000Z',
          id: 1,
          isDefault: true,
          name: '图片',
          siteId,
          updatedAt: '2020-06-12T08:19:21.000Z',
        },
      ];

      return;
    }

    if (ctx.request.path === '/api/design/image/list') {
      const { no, size } = ctx.request.query;
      const result = await request(`${opts.urls.memberBackendUrl}/api/scutum/web/manage/paging`, {
        method: 'POST',
        data: {
          pageSize: size,
          pageNo: no,
          auditStatus: 'PASSED',
          type: 'PIC',
        },
      });

      const data = result.result.data.map((i) => {
        Object.assign(i, { originName: i.name });
        return i;
      });
      if (result.success) {
        ctx.body = {
          list: data,
          total: result.result.total,
        };
      } else {
        ctx.status = 500;
        ctx.body = '获取素材失败';
      }
      return;
    }

    if (ctx.request.path === '/api/design/image/info') {
      ctx.body = {};
      return;
    }
    await next();
  };
};
