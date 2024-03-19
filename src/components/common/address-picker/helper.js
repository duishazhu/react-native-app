/*
 *@description: 返回父级id 和 当前选中id
 *@author: yin.zhq
 *@date: 2020-12-23 10:14:26
 *
 */

export const returnPIdSecId = (current, defaultAddress) => {
  let selectId = '';
  let parentId = '';
  switch (current) {
    case 1:
      parentId = defaultAddress.provinceId;
      selectId = defaultAddress.cityId;
      break;
    case 2:
      parentId = defaultAddress.cityId;
      selectId = defaultAddress.regionId;
      break;
    case 3:
      parentId = defaultAddress.regionId;
      selectId = defaultAddress.streetId;
      break;
    default:
      parentId = 1;
      selectId = defaultAddress.provinceId;
      break;
  }

  return { parentId, selectId };
};

/*
 *@params1: addressInfo - 默认省市区对象
 *@params2: level - 几层地级
 *@description:
 *@author: yin.zhq
 *@date: 2021-04-14 14:09:04
 */

export const getParentIdAndLevel = (addressInfo, level) => {
  const addressKeys = ['province', 'city', 'region', 'street'];
  const defaultAddress = addressInfo || {};
  let current = 0;

  addressKeys.forEach((item, index) => {
    if (defaultAddress[`${item}Id`] && index <= level - 1) {
      current = index === level - 1 ? index : index + 1;
    }
  });

  return { ...returnPIdSecId(current, addressInfo), current };
};
