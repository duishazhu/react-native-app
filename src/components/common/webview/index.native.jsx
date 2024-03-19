import React, { forwardRef } from 'react';
import BaseWebView from 'react-native-webview';

function WebView(props, ref) {
  return (
    <BaseWebView
      {...props}
      ref={ref}
      // 如果用户点击导航至新页面，但新页面不在此白名单中，则该URL将由操作系统处理。列入白名单的默认来源是[“http://”, "https://"]
      originWhitelist={['*']}
      // fix deeplink 报错: net::ERR_UNKNOWN_URL_SCHEME
      // react-native-web > 11.0.2 修复 android 首次不执行 onShouldStartLoadWithRequest issue：https://github.com/react-native-webview/react-native-webview/pull/1689
      onShouldStartLoadWithRequest={(request) => /https?:\/\//.test(request.url)}
    />
  );
}

export default forwardRef(WebView);
