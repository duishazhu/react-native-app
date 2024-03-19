/* eslint-disable no-param-reassign */
import { request } from '@terminus/mall-utils';

export function getPointOrderList({
  createTimeRange,
  orderStatus,
  orderChannel,
  campaignTag,
  requiredStatus,
  settlementStatus,
  settlementType,
  ...data
}) {
  if (createTimeRange?.start && createTimeRange?.end) {
    data.createdFrom = createTimeRange.start;
    data.createdTo = createTimeRange.end;
  }
  return request('/api/trade/order/store/online-order-list', {
    method: 'POST',
    data: {
      ...data,
      orderStatus: orderStatus && [orderStatus],
      orderChannel,
      campaignTag,
      requiredStatus,
      settlementStatus,
      settlementType,
    },
  });
}

export function getPointOrderDetail(data) {
  return request(`/api/trade/order/store/online-order-detail`, {
    method: 'POST',
    data,
  });
}

export function getPointOrderDetailByFunc(data) {
  return request(`/api/trantor/func/trade_center_OnlineTradeOrderDetailFunc`, {
    method: 'POST',
    data: [
      {
        id: {
          value: data?.orderId,
        },
        selfPickCode: {
          value: data?.selfPickCode,
        },
      },
    ],
    headers: {
      'From-Menu-Key': 'mix_mix_WeCom_center_OnlineTradeOrderDetail',
      'Trantor-Module': 'mix_mix_WeCom_center',
    },
  });
}

export function pickUpOrder(data) {
  return request('/api/trade/order/store/pick-up-goods', {
    method: 'POST',
    data,
  });
}
