import { createStyle } from 'styles/theme';
import { isWeb } from 'utils/platform';

export default createStyle({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
  },
  rightAction: {
    right: 0,
    width: 80,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomButton: {
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelStyle: {
    flex: 1,
    height: 42,
    borderRadius: 20,
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
    width: 'auto',
    height: '100%',
    display: 'flex',
    minHeight: 0,
    paddingHorizontal: 12,
    backgroundColor: '$white',
    fontSize: 16,
    color: '$gray',
  },
  scrollStyle: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titleStyle: {
    fontSize: 20,
    padding: isWeb ? 12 : 16,
    color: '$colorText',
    lineHeight: 28,
  },
  dateStyle: {
    fontSize: 14,
    color: '$lightGray',
    paddingHorizontal: isWeb ? 12 : 16,
    lineHeight: 16,
    marginBottom: 12,
  },
  iconStyle: {
    width: 24,
    height: 24,
    color: '$colorIconBase',
    marginLeft: 12,
  },
});
