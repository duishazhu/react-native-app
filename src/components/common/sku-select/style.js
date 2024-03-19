import { createStyle } from 'styles';

export default createStyle({
  header: {
    marginBottom: 12,
  },
  skuList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sku: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 32,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  selectedSku: {
    backgroundColor: 'rgba(255, 136, 0, 0.1)',
  },
  skuText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectedSkuText: {
    color: '#FF8800',
  },
  disabledSkuText: {
    color: '#999999',
  },
  split: {
    marginHorizontal: 8,
    width: 1,
    height: 12,
    backgroundColor: '#BEBEBE',
  },
  selectedSplit: {
    backgroundColor: '#FF8800',
  },
  disabledSplit: {
    backgroundColor: '#E3E3E3',
  },
  stepper: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
