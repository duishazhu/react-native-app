import { SafeBottomInset, SafeTopInset, deviceHeight } from 'common/constants';
import { createStyle } from 'styles';
// 屏幕高度-顶部状态栏-底部导航条-footer高度-标题栏高度
const listContainerHeight = deviceHeight - SafeTopInset - SafeBottomInset - 50 - 44;

export default createStyle({
  listContainer: {
    flexDirection: 'row',
    height: listContainerHeight,
  },
  categoryContainer: {
    flex: 0.2,
    height: '100%',
    backgroundColor: '#F2F3F5',
  },
  itemContainer: {
    flex: 0.8,
    height: '100%',
  },
  firstCategoryItem: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstCategoryItemActive: {
    backgroundColor: '#FFFFFF',
  },
  firstCategoryTitle: {
    fontSize: 13,
    color: '#7D7E80',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  firstCategoryTitleActive: {
    fontWeight: '600',
    color: '#323233',
  },
  goodItemWrapper: {
    height: 130,
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 16,
  },

  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },

  footerBtn: {
    width: 100,
    height: 40,
    borderRadius: 20,
  },
});
