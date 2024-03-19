import { createStyle } from 'styles';

export default createStyle({
  scrollView: {
    backgroundColor: '$white',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  provinceName: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#999999',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  reLocation: {
    marginLeft: 2,
    fontSize: 11,
    lineHeight: 16,
    color: '#999999',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
  },
  storeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  storeWrap: {
    marginBottom: 10,
    paddingHorizontal: 4,
    width: '33.33%',
  },
  store: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
    backgroundColor: '#F6F6F6',
  },
  activeStore: {
    backgroundColor: 'rgba(255, 136, 0, 0.1)',
  },
  storeText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#333333',
    textAlign: 'center',
  },
  activeStoreText: {
    color: '#FF8800',
  },
  filterStore: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEDF0',
  },
  filterStoreText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  listItem: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '$white',
  },
  listItemName: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333333',
  },
  cascadeHeader: {
    height: 46,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
});

export const multipleStyles = createStyle({
  page: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '$white',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEDF0',
  },
  itemText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  selectedTip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTipLabel: {
    marginRight: 8,
    fontSize: 11,
    lineHeight: 16,
    color: '#999999',
  },
  selectedTipText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export const cascadeStyle = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  allText: {
    color: '#FF8800',
  },
  arrow: {
    color: '#7D7E80',
    paddingHorizontal: 8,
    fontSize: 14,
    lineHeight: 20,
  },

  defaultText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginLeft: 10,
  },
});
