import React, { Fragment } from 'react';
import { Portal } from '@terminus/nusi-mobile';
import { isMp } from 'utils/platform';

export function PortalPlugin({ children }) {
  const Wrapper = isMp ? Fragment : Portal.Host;

  return <Wrapper>{children}</Wrapper>;
}
