import { createStyle } from 'styles';
import { SafeBottomInset } from 'common/constants';

export default createStyle({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  container: {
    paddingHorizontal: 16,
  },
  // 卡片样式
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeText: {
    flex: 1,
    paddingHorizontal: 8,
  },
  campaignTag: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255, 136, 0, 1)',
    borderBottomRightRadius: 6,
  },
  campaignTagText: {
    fontSize: 9,
    lineHeight: 16,
    color: '$white',
  },
  linePoint: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  lineQuality: {
    marginLeft: 12,
    fontSize: 12,
    color: '#999999',
  },
  orderSummaryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  orderTime: {
    fontSize: 12,
    color: '#999999',
  },
  orderSummary: {
    fontSize: 12,
    color: '#333333',
  },
  writeOffButton: {
    position: 'absolute',
    bottom: 66 + SafeBottomInset,
    right: 16,
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    background: 'linear-gradient(143.79deg, #FFE423 0%, #FFC824 100%)',
    boxShadow: '2px 4px 6px  #FFBB00',
    borderRadius: 25,
  },
  writeOffButtonText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
  },
});

export const detailStyles = createStyle({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderCode: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subInfo: {
    marginBottom: 12,
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(100, 101, 102, 1)',
  },
  subInfoHighlight: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(50, 50, 51, 1)',
  },
  productContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '$white',
    borderRadius: 8,
  },
  campaignTag: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255, 136, 0, 1)',
    borderBottomRightRadius: 6,
  },
  campaignTagText: {
    fontSize: 9,
    lineHeight: 16,
    color: '$white',
  },
  linePoint: {
    marginLeft: 12,
    fontSize: 12,
    color: 'rgba(255, 136, 0, 1)',
  },
  linePointNum: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(255, 136, 0, 1)',
  },
  lineQuality: {
    marginLeft: 12,
    fontSize: 12,
    color: '#999999',
  },
  footer: {
    paddingHorizontal: 16,
  },
  action: {
    marginVertical: 5,
  },
  writeOffButton: {
    position: 'absolute',
    bottom: 66 + SafeBottomInset,
    right: 16,
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    background: 'linear-gradient(143.79deg, #FFE423 0%, #FFC824 100%)',
    boxShadow: '2px 4px 6px  #FFBB00',
    borderRadius: 25,
  },
  writeOffButtonText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
  },
});
