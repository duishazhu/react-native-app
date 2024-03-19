import { createStyle } from 'styles';

export default createStyle({
  container: {},
  wrapper: {
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  reduceButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 11,
  },
  reduceDisabledButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(153, 153, 153, 0.1)',
    borderRadius: 11,
  },
  addButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#FFE423',
  },
  addDisabledButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: 'rgba(255, 228, 35, 0.1)',
  },
});
