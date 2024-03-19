export function convertRouteToArray(obj) {
  return Object.keys(obj).map((routeName) => {
    return { ...obj[routeName], routeName };
  });
}

export function convertToLinkConfig(arr) {
  const map = {};
  arr.forEach((item) => {
    map[item.routeName] = { path: item.path };
  });
  return map;
}
