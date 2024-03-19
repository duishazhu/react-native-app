import React, { useMemo } from 'react';
import CommonApps from 'common/apps';
import useRequest from 'hooks/useRequest';
import { getHomeApps } from 'home/service';

const moreApp = [
  {
    key: 'more',
    path: 'Apps',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '更多应用',
  },
  {
    key: 'PointOrder',
    path: 'PointOrder',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '积分订单',
  },
  {
    key: 'MemberRegister',
    path: 'MemberRegister',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '会员注册',
  },
  {
    key: 'StoreOrder',
    path: 'StoreOrder',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '门店订货',
  },
  {
    key: 'StoreReturn',
    path: 'StoreReturn',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '门店退货',
  },
  {
    key: 'AdjustApply',
    path: 'AdjustApply',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '调价申请',
  },
  {
    key: 'StoreTransfer',
    path: 'StoreTransfer',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '门店调拨',
  },
  {
    key: 'ProductRecall',
    path: 'ProductRecall',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '商品召回',
  },
  {
    key: 'CashPayment',
    path: 'CashPayment',
    local: true,
    image: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/home/more-apps.png',
    name: '现金缴纳',
  },
];

export default function Apps() {
  const { result } = useRequest(getHomeApps);

  const data = useMemo(() => [...(result || []), ...moreApp], [result]);

  return <CommonApps title="我的应用" data={data} />;
}
