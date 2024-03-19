export function getStoreList(data) {
  const result = [];
  const filterData = (list) => {
    list.forEach((item) => {
      if (item.level === 'STORE') {
        result.push(item);
      } else if (item.childList?.length) {
        filterData(item.childList);
      }
    });
  };
  filterData(data);
  return result;
}
