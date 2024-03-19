import { createStyle } from 'styles';
import { SafeBottomInset } from 'common/constants';

export default createStyle({
  fixBottomBar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: SafeBottomInset + 1,
    backgroundColor: '$white',
  },
});
