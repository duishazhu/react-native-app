import { createStyle } from 'styles';
import { scaleSize } from 'utils/screen-utils';

export default createStyle({
  sectionTitle: {
    marginTop: 26,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  appsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '$white',
    borderRadius: 6,
  },
  appContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: scaleSize(70),
  },
  appIcon: {
    marginBottom: 4,
    width: 30,
    height: 30,
  },
  appName: {
    fontSize: 10,
    lineHeight: 14,
  },
});
