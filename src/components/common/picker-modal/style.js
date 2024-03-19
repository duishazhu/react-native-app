import { commonStyle, createStyle } from 'styles';

export default createStyle({
  pickerModal: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    ...commonStyle._flexRow,
    justifyContent: 'space-between',
    height: 48,
    minHeight: 48,
  },
  action: {
    ...commonStyle._flexRow,
    paddingHorizontal: 16,
    height: '100%',
  },
  cancelText: {
    fontSize: 14,
    color: '#999999',
  },
  confirmText: {
    fontSize: 14,
    color: '#FF8800',
  },
  title: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
});
