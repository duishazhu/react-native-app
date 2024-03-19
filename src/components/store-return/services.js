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
      orderChannel: orderChannel && [orderChannel],
      campaignTag: campaignTag && [campaignTag],
      requiredStatus: requiredStatus && [requiredStatus],
      settlementStatus: settlementStatus && [settlementStatus],
      settlementType: settlementType && [settlementType],
    },
  });
}

export function getPointOrderDetail(orderId) {
  return request(`/api/trade/order/store/online-order-detail?orderId=${orderId}`, {
    method: 'POST',
  });
}

export function pickUpOrder(data) {
  return request('/api/trade/order/store/pick-up-goods', {
    method: 'POST',
    data,
  });
}
