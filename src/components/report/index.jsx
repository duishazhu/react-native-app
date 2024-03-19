import React from 'react';
import {} from 'react-native';
import { Empty } from 'common/empty';
import DevelopingImg from 'images/common/developing.png';
import BasePage from 'common/base-page';

export default function Report() {
  return (
    <BasePage>
      <Empty emptyLabel="开发中，敬请期待..." imgOpt={{ img: DevelopingImg, width: 120, height: 120 }} />
    </BasePage>
  );
}
