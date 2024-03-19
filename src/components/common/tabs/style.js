import { createStyle, commonStyle } from 'styles';

export default createStyle({
  container: {
    ...commonStyle._flexRow,
  },
  tab: {
    position: 'relative',
    ...commonStyle._flexRow,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 16,
    height: 44,
  },
  scrollTab: {
    position: 'relative',
    ...commonStyle._flexRow,
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  tabText: {
    fontSize: 14,
    color: '#999999',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -20,
    height: 3,
    width: 40,
    backgroundColor: '$primaryColor',
  },
});
