import { getCurrentRange, getPassRange } from 'common/field/helper';

export const filterFields = [
  {
    title: '召回日期',
    name: 'createTimeRange',
    type: 'dateRangePicker',
    customProps: {
      options: [
        { label: '今日', value: getCurrentRange('day') },
        { label: '最近7天', value: getPassRange(7, 'day') },
        { label: '最近30天', value: getPassRange(30, 'day') },
      ],
    },
  },
  {
    title: '单据状态',
    name: 'orderChannel',
    type: 'select',
    customProps: {
      options: [
        { label: '全部', value: '0' },
        { label: '待处理', value: '1' },
        { label: '待审核', value: '2' },
        { label: '带退回', value: '3' },
        { label: '已完成', value: '4' },
        { label: '待结算', value: '5' },
        { label: '已关闭', value: '6' },
      ],
    },
  },
  {
    title: '单据排序(创建时间)',
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

const conventionRows = [
  { label: '召回单号', value: 'ZH202310100001' },
  { label: '召回门店', value: '长沙古曲路店' },
  { label: '召回日期', value: '2023-05-01  10:12:18' },
];

export const typeVal = {
  dispose: {
    tagType: 'info',
    tagValue: '待处理',
    rows: conventionRows,
    btns: [
      { children: '申请', type: 'default' },
      { children: '关闭', type: 'default' },
    ],
  },
  audit: {
    tagType: 'info',
    tagValue: '待审核',
    rows: conventionRows,
    btns: [{ children: '审核' }],
  },
  sendBack: {
    tagType: 'info',
    tagValue: '待退回',
    rows: conventionRows,
    btns: [],
  },
  closing: {
    tagType: 'info',
    tagValue: '待结算',
    rows: conventionRows,
    btns: [],
  },
  accomplish: {
    tagType: 'success',
    tagValue: '已完成',
    rows: conventionRows,
    btns: [],
  },
  close: {
    tagType: 'disabled',
    tagValue: '已关闭',
    rows: conventionRows,
    btns: [],
  },
};

export const tabs = [
  {
    key: 0,
    title: '召回商品',
  },
  {
    key: 1,
    title: '基本信息',
  },
  {
    key: 2,
    title: '操作信息',
  },
];
