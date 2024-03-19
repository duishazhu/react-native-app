const mockTransferOrderList = {
  data: [
    {
      id: 1,
      transferOrderCode: 'DB202310100001',
      transferOrderType: 'TRANSFER_OUT',
      initiateStoreName: '长沙古曲路店',
      transferOutStoreName: '长沙古曲路店',
      transferInStoreName: '长沙古曲路店',
      transferAmount: 2300,
      createdAt: '2024-01-02: 15:00',
      transferOrderStatus: 'WAITING_SUBMIT',
    },
    {
      id: 2,
      transferOrderCode: 'DB202310100001',
      transferOrderType: 'TRANSFER_IN',
      initiateStoreName: '长沙古曲路店',
      transferOutStoreName: '长沙古曲路店',
      transferInStoreName: '长沙古曲路店',
      transferAmount: 2300,
      createdAt: '2024-01-02: 15:00',
      transferOrderStatus: 'WAITING_RECEIVE',
    },
    {
      id: 3,
      transferOrderCode: 'DB202310100001',
      transferOrderType: 'TRANSFER_OUT',
      initiateStoreName: '长沙古曲路店',
      transferOutStoreName: '长沙古曲路店',
      transferInStoreName: '长沙古曲路店',
      transferAmount: 2300,
      createdAt: '2024-01-02: 15:00',
      transferOrderStatus: 'DONE',
    },
    {
      id: 4,
      transferOrderCode: 'DB202310100001',
      transferOrderType: 'TRANSFER_OUT',
      initiateStoreName: '长沙古曲路店',
      transferOutStoreName: '长沙古曲路店',
      transferInStoreName: '长沙古曲路店',
      transferAmount: 2300,
      createdAt: '2024-01-02: 15:00',
      transferOrderStatus: 'CANCELED',
    },
  ],
  total: 4,
};

export function pagingTransferOrderList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransferOrderList);
    }, 1500);
  });
}
