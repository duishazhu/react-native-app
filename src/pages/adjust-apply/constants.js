import { getCurrentRange, getPassRange } from 'common/field/helper';

export const tabs = [
  {
    key: 0,
    title: '全部',
  },
  {
    key: 1,
    title: '已审核',
  },
  {
    key: 2,
    title: '已作废',
  },
  {
    key: 3,
    title: '草稿',
  },
];

const conventionRows = [
  { label: '调价商品数', value: '20' },
  { label: '提交人', value: '0092王丽' },
  { label: '提交时间', value: '2023-05-01  10:12:18' },
];
export const typeVal = {
  audit: {
    tagType: 'success',
    tagValue: '已审核',
    rows: [{ label: '门店名称', value: '人民东路店' }, ...conventionRows],
    btns: [],
  },
  invalid: {
    tagType: 'info',
    tagValue: '已作废',
    rows: [{ label: '门店名称', value: '人民东路店' }, ...conventionRows],
    btns: [{ children: '删除', type: 'default' }, { children: '编辑' }],
  },
  draft: {
    tagType: 'danger',
    tagValue: '草稿',
    rows: [{ label: '调价单号', value: 'TZ202009160000018-1' }, ...conventionRows],
    btns: [{ children: '删除', type: 'default' }],
  },
};

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
    title: '单据排序',
    name: 'orderChannel',
    type: 'select',
    customProps: {
      options: [
        { label: '时间降序', value: 'WXAPP' },
        { label: '时间升序', value: 'ALIAPP' },
      ],
    },
  },
];
