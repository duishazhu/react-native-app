import React from 'react';
import PropTypes from 'prop-types';
import { getStyle } from 'common/helper';
import empty from 'images/common/not-found.png';
import 'lazysizes';

/**
 * 解决react-native-web的图片组件在safari下图片加载多次问题，暂时自己封装图片组件
 * 支持懒加载
 */
export default class extends React.PureComponent {
  static propTypes = {
    lazyLoad: PropTypes.bool,
    defaultSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'center']),
  };

  static defaultProps = {
    lazyLoad: false,
    defaultSource: empty,
    resizeMode: 'contain',
  };

  resolveSource = (source) => {
    if (source && typeof source === 'object') {
      return source.uri;
    }

    return source;
  };

  getResizeStyle = () => {
    const { resizeMode } = this.props;

    switch (resizeMode) {
      case 'contain':
        return { objectFit: 'contain', objectPosition: 'center' };
      case 'center':
        return { objectFit: 'none', objectPosition: 'center' };
      case 'stretch':
        return { objectFit: 'fill', objectPosition: 'center' };
      case 'cover':
      default:
        return { objectFit: 'cover', objectPosition: 'center' };
    }
  };

  getImageSize = () => {
    const { style, source } = this.props;
    const { width, height } = getStyle(style);
    let defaultSize = {};
    if (source && typeof source === 'object') {
      defaultSize = { width: source.width, height: source.height };
    }

    const size = {};
    if (width != null) {
      size.width = width;
    } else if (defaultSize.width != null) {
      size.width = defaultSize.width;
    }

    if (height != null) {
      size.height = height;
    } else if (defaultSize.height != null) {
      size.height = defaultSize.height;
    }

    return size;
  };

  filterImageStyleFromStyle = (style) => {
    const supportStyleKeys = [
      'borderRadius',
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ];

    const filterStyle = {};
    Object.keys(style).forEach((it) => {
      if (supportStyleKeys.includes(it)) {
        filterStyle[it] = style[it];
      }
    });

    return filterStyle;
  };

  render() {
    const { style, defaultSource, source, lazyLoad } = this.props;
    const defaultImageUrl = this.resolveSource(defaultSource) || empty;
    const imageUrl = this.resolveSource(source);

    const defaultContainerStyle = {
      boxSizing: 'border-box',
      borderWidth: 0,
      borderStyle: 'solid',
      fontSize: 0,
      lineHeight: 1,
    };
    const containerStyle = getStyle(style);
    const imageStyle = this.filterImageStyleFromStyle(containerStyle);
    const containerSize = this.getImageSize();
    const imageResizeStyle = this.getResizeStyle();

    const lazyProps = lazyLoad
      ? {
          className: 'lazyload',
          src: defaultImageUrl,
          'data-src': imageUrl,
        }
      : { src: imageUrl || defaultImageUrl };

    return (
      <div style={{ ...defaultContainerStyle, ...containerStyle, ...containerSize }}>
        {defaultImageUrl || imageUrl ? (
          <img style={{ width: '100%', height: '100%', ...imageResizeStyle, ...imageStyle }} {...lazyProps} alt="" />
        ) : null}
      </div>
    );
  }
}
