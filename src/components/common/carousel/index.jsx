import React from 'react';
import { Carousel } from '@terminus/nusi-mobile';

export default function (props) {
  return <Carousel autoplayInterval={3000} {...props} />;
}
