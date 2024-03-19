import { createStyle } from 'styles';
import { themes } from 'styles/theme';
import { SafeTopInset, MenuButtonOffset } from 'common/constants';

export default createStyle({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44 + SafeTopInset,
    paddingTop: SafeTopInset,
    backgroundColor: themes.$white,
    position: 'relative',
  },
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    paddingHorizontal: 12,
  },
  headerLeftWrap: {
    paddingHorizontal: 4,
  },
  headerLeftIcon: {
    // color: themes.$colorIconBase,
    width: 20,
    height: 20,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: themes.$colorTextBase,
    lineHeight: 16,
  },
  headerRight: {
    paddingHorizontal: 12,
    marginRight: MenuButtonOffset,
  },
});

export const absoluteStyle = createStyle({
  headerLeft: {
    position: 'absolute',
    top: SafeTopInset,
    left: 0,
    paddingHorizontal: 12,
  },
  headerTitleWrap: {
    marginHorizontal: 70,
    flex: 1,
  },
  headerRight: {
    position: 'absolute',
    top: SafeTopInset,
    right: 0,
    paddingHorizontal: 12,
  },
});
