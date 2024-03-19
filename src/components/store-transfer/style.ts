import { createStyle } from 'styles';

export default createStyle({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  titleSearch: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingRight: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
  },
  cardContent: {
    marginTop: 10,
  },
  panel: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
  },
  orderTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 4,
  },
  modalText: {
    color: '#969799',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  radioWrap: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
});
