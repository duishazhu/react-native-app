import React from 'react';
import { Carousel } from '@terminus/nusi-mobile';
import 'common/carousel/index.scss';

export default function (props) {
  const { className, ...otherProps } = props;
  return (
    <Carousel
      className={`common-carousel ${className}`}
      lazyLoad
      dotsClass="dots"
      autoplayInterval={3000}
      {...otherProps}
    />
  );
}
