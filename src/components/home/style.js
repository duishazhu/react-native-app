import { createStyle } from 'styles';
import { SafeTopInset, deviceWidth } from 'common/constants';
import { scaleSize } from 'utils/screen-utils';

export default createStyle({
  page: {
    position: 'relative',
    paddingTop: SafeTopInset + 44,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: scaleSize(169),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftIcon: {
    width: 20,
    height: 20,
  },
  headerLeftText: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightText: {
    marginHorizontal: 4,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  carouselContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  carousel: {
    width: '100%',
    height: scaleSize(140),
    borderRadius: 12,
  },
  carouselItem: {
    width: deviceWidth - 32,
    height: scaleSize(140),
    borderRadius: 12,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: '$white',
    borderRadius: 6,
  },
  noticeLabel: {
    marginRight: 10,
    width: 30,
    height: 24,
  },
  noticeContent: {
    flex: 1,
    overflow: 'hidden',
    height: 24,
  },
  noticeText: {
    fontSize: 13,
    lineHeight: 24,
    color: '#999999',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  filterText: {
    marginRight: 4,
    fontSize: 11,
    color: '#999999',
  },
  taskBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
