const mockItems = {
  data: [
    { id: 1, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
    { id: 2, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
    { id: 3, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
    { id: 4, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
    { id: 5, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
    { id: 6, goodTitle: 'xxx商品', price: 48.8, unit: '件', quantity: 1, categoryId: 1 },
  ],
  total: 6,
};

export function searchProduct() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockItems);
    }, 1000);
  });
}
