import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import { NavigationService } from '@terminus/react-navigation';
import { Icon } from 'common/icon';
import { isWeb, isWxMp } from 'utils/platform';
import styles, { absoluteStyle } from 'common/header/style';

export default function Header(props) {
  const {
    headerStyle,
    headerLeftStyle,
    leftIconName = 'icon-back',
    leftIconStyle,
    onLeftClick,
    leftContent,
    title,
    titleStyle,
    rightContent,
    titleType,
  } = props;

  function goBack(e) {
    e.preventDefault?.();

    // 如果是输入地址历史记录length为2(原因未知)，则返回首页
    if (isWeb && window.history.length === 1) {
      NavigationService.navigate('Home');
      return;
    }
    NavigationService.pop();
  }

  // XXX: 微信小程序中 由于右侧胶囊存在，在采取absolute居中方案中 rightContent 极易覆盖到 title，例如 Cart(非Tab中的购物车页，商详等入口进入)
  // 因此 isWxMp && 存在 rightContent 时，走 flex 居中方案
  const isAbsoluteMode = !(isWxMp && rightContent);

  return (
    <View style={[styles.headerContainer, headerStyle]}>
      <View style={[isAbsoluteMode ? absoluteStyle.headerLeft : styles.headerLeft, styles.container, headerLeftStyle]}>
        {leftContent === null
          ? null
          : leftContent || (
              <TouchableWithoutFeedback onPress={onLeftClick || goBack}>
                <View style={styles.headerLeftWrap}>
                  <Icon style={[styles.headerLeftIcon, leftIconStyle]} type={leftIconName} />
                </View>
              </TouchableWithoutFeedback>
            )}
      </View>
      <View style={[isAbsoluteMode ? absoluteStyle.headerTitleWrap : styles.headerTitleWrap, styles.container]}>
        {typeof title === 'string' || !titleType ? (
          <Text style={[styles.headerTitleText, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      {rightContent ? (
        <View style={[isAbsoluteMode ? absoluteStyle.headerRight : styles.headerRight, styles.container]}>
          {rightContent}
        </View>
      ) : null}
    </View>
  );
}

Header.propTypes = {
  titleType: PropTypes.string,
  onLeftClick: PropTypes.func,
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
  leftIconName: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  leftIconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  headerLeftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

Header.defaultProps = {
  leftIconName: 'icon-arrow-back',
};
