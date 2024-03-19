import React from 'react';
import { View, Text } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';

import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import Image from 'common/image';
import { Icon } from 'common/icon';
import { FormattedMessage } from 'utils/react-intl';
import { styles } from 'common/empty/style';

/**
 * 空卡片
 *
 * [imgOpt] 图片配置
 * [emptyLabel] 为空文案
 * [render] 页面下方渲染函数
 * [hasLink] 是否带有去购物的链接
 * [style] 卡片样式
 */
export function Empty(props) {
  const { imgOpt = {}, emptyLabel = null, render = null, hasLink, style = {}, textStyle = {} } = props;

  const renderImg = () => {
    const { img, width, height, style: styleImg, imgEle } = imgOpt;
    if (img) {
      return <Image style={[styles.emptyImg, styleImg, { width, height }]} source={img} />;
    }
    if (imgEle) {
      return imgEle;
    }
    return null;
  };

  const gotoHome = () => {
    NavigationService.navigate('Home');
  };

  return (
    <View style={[styles.emptyWrap, style]}>
      {renderImg()}
      {emptyLabel && <Text style={[styles.emptyText, textStyle]}>{emptyLabel}</Text>}
      {hasLink ? (
        <TouchableWithoutFeedback onPress={gotoHome}>
          <View style={styles.linkWrap}>
            <Text style={styles.linkText}>
              <FormattedMessage id="common.empty.text" defaultMessage="去购物" />
            </Text>
            <Icon style={styles.linkText} type="right" size="xxs" />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {render && render()}
    </View>
  );
}
