import { createStyle } from 'styles/theme';
import { scaleColSize } from 'utils/screen-utils';

export default createStyle({
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  column: {
    flexBasis: scaleColSize(2, 31),
    height: '100%',
  },
});
