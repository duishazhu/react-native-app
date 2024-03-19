import { isIosWeb, isAndroidWeb, isIosWechat, isAndroidWechat, isWeb } from 'utils/platform';

interface WakeUpProps {
  scheme: string;
  downloadUrl: string;
  appstoreUrl: string;
  wechatUrl: string;
  onFail: (props: Omit<WakeUpProps, 'onFail'>) => void;
  iconUrl: string;
}

let hasLink = false;

export default (props: WakeUpProps) => {
  const { scheme, downloadUrl, onFail } = props;
  // 演示需要先隐藏
  // if (isWeb && hasLink === false) {
  //   const appButton = document.createElement('a')
  //   appButton.href = scheme
  //   appButton.style.cssText = 'position:fixed;height:40px;width: 40px;background-size: contain;bottom: 150px;right:5px;background-image: url("//gw.alicdn.com/bao/uploaded/TB1FjNySpXXXXc8aXXXXXXXXXXX-200-200.png");'

  //   document.body.appendChild(appButton);
  //   hasLink = true
  // }

  if (isIosWeb && !isIosWechat) {
    window.location.href = scheme;
    return;
  }

  if (isAndroidWeb && !isAndroidWechat) {
    window.location.href = scheme;
    const last = Date.now();
    const ifr = document.createElement('iframe');
    ifr.src = scheme;
    ifr.style.cssText = 'display:none;border:0;width:0;height:0;';
    document.body.appendChild(ifr);

    setTimeout(function () {
      document.body.removeChild(ifr);
      // setTimeout回小于2000一般为唤起失败
      if (Date.now() - last < 2000) {
        // eslint-disable-next-line no-console
        console.log('fail wake up, jump to download');
        downloadUrl ? (window.location.href = downloadUrl) : null;
        onFail?.(props);
      }
    }, 1000);
  }
};
