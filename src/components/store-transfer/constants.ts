import { getCurrentRange, getPassRange } from 'common/field/helper';

// 调拨类型
export enum TransferOrderTypeDict {
  TransferOut = 'TRANSFER_OUT',
  TransferIn = 'TRANSFER_IN',
}

export const TransferOrderTypeDictText = {
  [TransferOrderTypeDict.TransferOut]: '调出',
  [TransferOrderTypeDict.TransferIn]: '调入',
};

// 调拨单状态
export enum TransferOrderStatusDict {
  WaitingSubmit = 'WAITING_SUBMIT',
  WaitingAudit = 'WAITING_AUDIT',
  WaitingReceive = 'WAITING_RECEIVE',
  Canceled = 'CANCELED',
  Done = 'DONE',
}

export const TransferOrderStatusDictText = {
  [TransferOrderStatusDict.WaitingSubmit]: '待提交',
  [TransferOrderStatusDict.WaitingAudit]: '待审核',
  [TransferOrderStatusDict.WaitingReceive]: '待接收',
  [TransferOrderStatusDict.Canceled]: '已取消',
  [TransferOrderStatusDict.Done]: '已完成',
};

const timeOptions = [
  { label: '全部', value: undefined },
  { label: '今日', value: getCurrentRange('day') },
  { label: '最近1周', value: getPassRange(1, 'week') },
  { label: '最近1月', value: getPassRange(1, 'month') },
];

const transferOrderTypeOptions = [
  { label: '全部', value: undefined },
  { label: '调入', value: TransferOrderTypeDict.TransferIn },
  { label: '调出', value: TransferOrderTypeDict.TransferOut },
];
const transferOrderStatusOptions = [
  { label: '全部', value: undefined },
  { label: '待提交', value: TransferOrderStatusDict.WaitingSubmit },
  { label: '待审核', value: TransferOrderStatusDict.WaitingAudit },
  { label: '待接收', value: TransferOrderStatusDict.WaitingReceive },
  { label: '已完成', value: TransferOrderStatusDict.Done },
  { label: '已取消', value: TransferOrderStatusDict.Canceled },
];
const transferOrderBy = [
  { label: '时间降序', value: undefined },
  { label: '时间降序', value: TransferOrderStatusDict.WaitingSubmit },
];

export const filterFields = [
  {
    title: '调拨日期',
    name: 'createTimeRange',
    type: 'dateRangePicker',
    customProps: { options: timeOptions },
  },
  {
    title: '调拨类型',
    name: 'transferOrderType',
    type: 'select',
    customProps: { options: transferOrderTypeOptions },
  },
  {
    title: '单据状态',
    name: 'transferOrderStatus',
    type: 'select',
    customProps: { options: transferOrderStatusOptions },
  },

  {
    title: '单据排序',
    name: 'orderBy',
    type: 'select',
    customProps: { options: transferOrderBy },
  },
];
