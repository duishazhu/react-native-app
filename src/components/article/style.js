import { createStyle } from 'styles/theme';

export default createStyle({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$colorBackground',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelStyle: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmStyle: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentStyle: {
    flex: 1,
    padding: 10,
  },
  containerStyle: {
    backgroundColor: '$colorBackground',
    flex: 1,
  },
});
