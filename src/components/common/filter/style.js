import { createStyle } from 'styles';
import { SafeTopInset, SafeBottomInset } from 'common/constants';

export default createStyle({
  filterText: {
    marginLeft: 2,
    fontSize: 12,
    color: '#333333',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingTop: SafeTopInset,
    paddingBottom: SafeBottomInset,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  fieldTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export const quickSelectStyles = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
  },
  selectedItem: {
    backgroundColor: '#FFE423',
  },
  itemText: {
    fontSize: 11,
    color: '#333333',
  },
  selectedItemText: {
    fontWeight: 'bold',
  },
});

export const sortStyles = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 2,
    fontSize: 12,
    lineHeight: 16,
    color: '#999999',
  },
  activeText: {
    color: '#FF8800',
  },
});
