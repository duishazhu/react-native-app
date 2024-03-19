import { Loading } from '@terminus/nusi-mobile';
import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { useQuery } from '@terminus/octopus-hooks';
import BasePage from 'common/base-page';
import WebView from 'common/webview';
import { isAndroid } from 'utils/platform';

const defaultOptions = {
  usePageTitle: false, // 自动加载 url document.title，作为页面title
  showLoading: false, // 页面加载时展示 loading
  handleBackPress: false, // android 点击返回键改为内部wap页面back  而不是原先的返回当前 webpage 页面
};

function WebPage() {
  const { uri, handleUrlChange, title, options = {} } = useQuery() || {};

  const finalOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const [pageTitle, setPageTitle] = useState(title);
  const [loading, setLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRef = useRef(0);
  const { usePageTitle, showLoading, handleBackPress } = finalOptions;

  // 监听 webview 物理返回键，点击返回键会优先做 url.goback 处理而不是关闭当前 webview 页面
  const _handlePressBack = useCallback(() => {
    if (canGoBack && webviewRef.current && typeof webviewRef.current.goBack === 'function') {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    if (isAndroid && handleBackPress) {
      BackHandler.addEventListener('hardwareBackPress', _handlePressBack);

      return () => BackHandler.removeEventListener('hardwareBackPress', _handlePressBack);
    }

    return undefined;
  }, [_handlePressBack, handleBackPress]);

  function _handleUrlChange(navState) {
    const { url } = navState;

    if (handleBackPress) {
      setCanGoBack(navState.canGoBack);
    }

    // 自动加载 url document.title，作为页面title
    if (usePageTitle) {
      setPageTitle(navState.title);
    }

    // 更改页面 loading 状态
    if (showLoading) {
      setLoading(navState.loading);
    }
    handleUrlChange && handleUrlChange(url);
  }

  return (
    <BasePage title={pageTitle}>
      <WebView ref={webviewRef} source={{ uri }} onNavigationStateChange={_handleUrlChange} />
      {showLoading ? <Loading toast visible={loading} /> : null}
    </BasePage>
  );
}

export default WebPage;
