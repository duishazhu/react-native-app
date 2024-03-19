import { getWechatToken } from 'common/wechat-share/services';
import { isWechat } from 'utils/platform';
import { pathToRegexp } from 'path-to-regexp';

const customSharePagePath = ['/activity', '/items/:shopId/:itemId'];
const defaultImage =
  'https://terminus-trantor.oss-cn-hangzhou.aliyuncs.com/images/2021/01/27/d1a32901-cb31-4440-ab80-e57108a454c0.png?x-oss-process=image/resize,w_160,h_160';
const SHARE_DEFAULT_CONTENT = {
  title: '会员小程序', // title
  desc: '赶快进入吧', // 分享描述
  imgUrl: defaultImage, // 图片链接，不能为base64
};

function configWechatSignatrue(url) {
  getWechatToken({ url }).then((rep) => {
    window.wx.config({
      ...rep,
      jsApiList: [
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
      ],
    });
  });
}

export function wechatShareTokenBind(shareContent) {
  if (!isWechat) return;

  configWechatSignatrue(shareContent.link);

  window.wx.ready(() => {
    window.wx.onMenuShareAppMessage(shareContent);
    window.wx.onMenuShareTimeline(shareContent);
    window.wx.updateAppMessageShareData(shareContent);
    window.wx.updateTimelineShareData(shareContent);
  });
}

export function injectDefaultWechatShare() {
  if (!isWechat) return;

  if (customSharePagePath.some((reg) => pathToRegexp(reg).exec(window.location.pathname))) return;

  wechatShareTokenBind({
    ...SHARE_DEFAULT_CONTENT,
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  });
}

export function injectWechatShareWithCustom(shareContent) {
  if (!isWechat) return;

  wechatShareTokenBind({
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    ...SHARE_DEFAULT_CONTENT,
    ...shareContent,
  });
}
