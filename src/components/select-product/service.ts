const mockItemsCategory = {
  data: [
    { id: 1, name: '类目1' },
    { id: 2, name: '类目2' },
    { id: 3, name: '类目3' },
    { id: 4, name: '类目4' },
    { id: 5, name: '类目5' },
  ],
  total: 5,
};

const mockItems = {
  data: [
    { id: 1, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
    { id: 2, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
    { id: 3, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
    { id: 4, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
    { id: 5, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
    { id: 6, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1 },
  ],
  total: 6,
};

export function getItemsCategory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockItemsCategory);
    }, 1000);
  });
}

export function getItemsByCategory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockItems });
    }, 1000);
  });
}
