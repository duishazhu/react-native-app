import { getCurrentRange, getPassRange } from 'common/field/helper';

export const timeOptions = [
  { label: '今日', value: getCurrentRange('day') },
  { label: '最近3天', value: getPassRange(3, 'day') },
  { label: '最近7天', value: getPassRange(1, 'week') },
  { label: '最近30天', value: getPassRange(1, 'week') },
  { label: '本周', value: getPassRange(1, 'week') },
  { label: '本月', value: getPassRange(1, 'week') },
  { label: '本季', value: getPassRange(1, 'week') },
  { label: '本年', value: getPassRange(1, 'week') },
];

export const orderStatusOptions = [
  { label: '全部', value: '', type: '' },
  { label: '草稿', value: 'UNPAID', type: 'danger' },
  { label: '待审核', value: 'WAITING_GROUP', type: 'info' },
  { label: '待打印', value: 'STOCK_IN_PREPARATION', type: 'info' },
  { label: '待签收', value: 'WAITING_SELF_PICK', type: 'info' },
  { label: '待复核', value: 'CONFIRMED', type: 'info' },
  { label: '已复核', value: 'UNISSUE', type: 'success' },
];

export const orderStatusMap = orderStatusOptions.reduce((current, item) => ({ ...current, [item.value]: item }), {});

export const orderChannelOptions = [
  { label: '微信小程序', value: 'WXAPP' },
  { label: '支付宝小程序', value: 'ALIAPP' },
];

export const returnTypeOptions = [
  { label: '全部', value: '' },
  { label: '不良品退回', value: 'SECKILL' },
  { label: '良品退回', value: 'GROUP_PURCHASING' },
  { label: '物料兑换退回', value: 'NONE' },
];

export const returnTypeMap = returnTypeOptions.reduce(
  (current, item) => ({ ...current, [item.value]: item.label }),
  {}
);

export const requiredStatusOptions = [
  { label: '未要货', value: 'UNREQUIRED' },
  { label: '待审核', value: 'AUDITING' },
  { label: '已取消', value: 'CANCELED' },
];

export const settlementStatusOptions = [
  { label: '未结算', value: 'UNSETTLEMENT' },
  { label: '待结算', value: 'SETTLEMENTING' },
  { label: '已结算', value: 'SETTLEMENTED' },
];

export const settlementTypeOptions = [
  { label: '费用补偿', value: 'COSTCOMPENSATIOB' },
  { label: '货物补偿', value: 'GOODSCOMPENSATION' },
  { label: '无需补偿', value: 'NOTCOMPENSATION' },
];

export const filterFields = [
  {
    title: '制单时间',
    name: 'createTimeRange',
    type: 'dateRangePicker',
    customProps: { options: timeOptions },
  },
  {
    title: '退货类型',
    name: 'returnType',
    type: 'select',
    customProps: { options: returnTypeOptions },
  },
  {
    title: '状态',
    name: 'orderStatus',
    type: 'select',
    customProps: { options: orderStatusOptions },
  },
];

export const exchangeTypeMap = {
  COUPON_EXCHANGE: '券兑换',
  ENTITY_EXCHANGE: '实物兑换',
};
