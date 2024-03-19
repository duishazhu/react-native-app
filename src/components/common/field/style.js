import { createStyle } from 'styles';

export default createStyle({
  hidden: {
    display: 'none',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
    backgroundColor: '$white',
  },
  fieldLabel: {
    marginVertical: 12,
  },
  fieldContent: {
    flex: 1,
    overflow: 'hidden',
  },
});

export const displayStyles = createStyle({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  fieldLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999999',
  },
  fieldContent: {
    flex: 1,
    overflow: 'hidden',
  },
  fieldValue: {
    fontSize: 12,
    lineHeight: 18,
    color: '#333333',
  },
});

export const tapStyles = createStyle({
  tapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tapContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 8,
  },
  tapText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  tapPlaceholder: {
    fontSize: 14,
    lineHeight: 20,
    color: '#C8C9CC',
  },
});

export const radioStyles = createStyle({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemWrap: {
    paddingVertical: 6,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 68,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
  },
  activeItem: {
    backgroundColor: 'rgba(255, 136, 0, 0.1)',
  },
  itemText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
    textAlign: 'center',
  },
  activeItemText: {
    color: '#FF8800',
  },
  // 列表
  listItem: {
    marginHorizontal: 0,
    paddingVertical: 12,
    width: '100%',
    borderBottomColor: '#EBEDF0',
    borderBottomWidth: 0.5,
  },
  listItemNoBorder: {
    borderBottomWidth: 0,
  },
  listItemText: {
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
});

export const inputStyles = createStyle({
  container: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  inputStyle: {
    backgroundColor: 'transparent',
  },
});

export const buttonSelectStyles = createStyle({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginVertical: -5,
  },
  itemWrap: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '33.33%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 36,
    backgroundColor: '#F6F6F6',
  },
  activeItem: {
    backgroundColor: 'rgba(255, 136, 0, 0.1)',
  },
  itemText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#333333',
    textAlign: 'center',
  },
  activeItemText: {
    color: '#FF8800',
  },
});

export const labelStyles = createStyle({
  container: {
    fontSize: 14,
    lineHeight: 20,
    color: '#646566',
  },
  required: {
    color: '#EE0A24',
  },
});

export const textareaStyles = createStyle({
  container: {
    paddingHorizontal: 0,
    paddingTop: 12,
    paddingBottom: 12,
  },
  inputStyle: {
    lineHeight: 20,
  },
});
