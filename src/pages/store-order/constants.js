import { getCurrentRange, getPassRange } from 'common/field/helper';
import { NavigationService } from '@terminus/react-navigation';

export const timeOptions = [
  { label: '今日', value: getCurrentRange('day') },
  { label: '最近3天', value: getPassRange(3, 'day') },
  { label: '最近7天', value: getPassRange(7, 'day') },
  { label: '最近30天', value: getPassRange(30, 'day') },
];

export const orderStatusOptions = [
  { label: '常规要货', value: 'UNPAID', type: 'info' },
  { label: '专题要货', value: 'WAITING_GROUP', type: 'info' },
  { label: '总部铺货', value: 'STOCK_IN_PREPARATION', type: 'warning' },
  { label: '紧急要货', value: 'WAITING_SELF_PICK', type: 'info' },
  { label: '新店铺货', value: 'CONFIRMED', type: 'success' },
  { label: '积分兑换', value: 'UNISSUE', type: 'info' },
];

export const filterFields = [
  {
    title: '下单时间',
    name: 'createTimeRange',
    type: 'dateRangePicker',
    customProps: { options: timeOptions },
  },
  {
    title: '制单时间',
    name: 'orderStatus',
    type: 'select',
    customProps: { options: orderStatusOptions },
  },
];

const conventionRows = [
  { label: '提交时间', value: '2023-05-01  10:12:18' },
  { label: '提交人', value: '0092王丽' },
  { label: '单据金额', value: '239.09', style: { fontWeight: 700, color: '#FF8800' } },
];

export const tabs = [
  {
    key: 0,
    title: '待提单',
    tagType: '',
    rows: [{ label: '要货门店', value: '盛世华章店' }, ...conventionRows],
    btns: [{ children: '继续编辑', type: 'default' }, { children: '提交' }],
  },
  {
    key: 1,
    title: '待审核',
    tagType: '',
    rows: [{ label: '申请单号', value: 'TZ202009160000018-1' }, ...conventionRows],
    btns: [],
  },
  {
    key: 2,
    title: '待支付',
    tagType: '',
    rows: [
      { label: '申请单号', value: 'TZ202009160000018-1' },
      { label: '发货仓库', value: '湖南富楚仓' },
      { label: '提交时间', value: '2023-05-01  10:12:18' },
      { label: '提交人', value: '0092王丽' },
      { label: '审核时间', value: '2023-05-01  10:12:18' },
      { label: '审核人', value: '张三' },
      { label: '单据金额', value: '239.09', style: { fontWeight: 700, color: '#FF8800' } },
      { label: '单据来源', value: 'XXX9' },
    ],
    btns: [],
  },
  {
    key: 3,
    title: '已完成',
    tagType: 'success',
    rows: [{ label: '要货门店', value: '盛世华章店' }, ...conventionRows],
    btns: [
      { children: '撤回要货', type: 'default' },
      {
        children: '订单信息',
        type: 'default',
        onPress: () => {
          NavigationService.navigate('OrderInfo');
        },
      },
      { children: '支付信息', type: 'default' },
      { children: '物流信息', type: 'default' },
    ],
  },
  {
    key: 4,
    title: '已失效',
    tagType: 'disabled',
    rows: [
      { label: '申请单号', value: 'TZ202009160000018-1' },
      { label: '发货仓库', value: '湖南富楚仓' },
      { label: '创建人', value: '0092王丽' },
      { label: '审核时间', value: '2023-05-01  10:12:18' },
      { label: '审核人', value: '张三' },
      { label: '单据金额', value: '239.09', style: { fontWeight: 700, color: '#FF8800' } },
      {
        label: '失效原因',
        value: '审核驳回',
        wrapStyle: { marginTop: 12 },
        extendBtn: '重新生成要货单',
      },
    ],
  },
];

export const getValue = (key, arr = tabs) => {
  return arr.find((el) => el.key === key);
};
