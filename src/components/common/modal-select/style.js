import { createStyle } from 'styles';

export default createStyle({
  selectModal: {
    height: '50%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    marginRight: 0,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    lineHeight: 40,
    color: '#333333',
  },
  selectedText: {
    color: '#FF8800',
  },
});
