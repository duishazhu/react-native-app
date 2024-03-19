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
        { label: '草稿', value: '1' },
        { label: '待审核', value: '2' },
        { label: '已审核', value: '3' },
        { label: '已取消', value: '4' },
      ],
    },
  },
];

const conventionRows = [
  { label: '门店名称', value: '长沙古曲路店' },
  { label: '缴款金额', value: '￥500.00', style: { color: '#FF8800' } },
  { label: '现金结余', value: '￥1000.00', style: { color: '#FF8800' } },
  { label: '缴款日', value: '2023-10-01' },
  { label: '申请人', value: '0092王丽' },
  { label: '申请时间', value: '2023-09-06  10:12:18' },
];

export const typeVal = {
  draft: {
    tagType: 'danger',
    tagValue: '草稿',
    rows: conventionRows,
    btns: [{ children: '删除', type: 'default' }, { children: '查看附件', type: 'default' }, { children: '编辑' }],
  },
  audit: {
    tagType: 'success',
    tagValue: '已审核',
    rows: conventionRows,
    btns: [{ children: '查看附件' }],
  },
  pending: {
    tagType: 'info',
    tagValue: '待审核',
    rows: conventionRows,
    btns: [{ children: '查看附件', type: 'default' }, { children: '审核' }],
  },
  cancel: {
    tagType: 'disabled',
    tagValue: '已取消',
    rows: conventionRows,
    btns: [{ children: '查看附件', type: 'default' }],
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
