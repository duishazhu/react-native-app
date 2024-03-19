import { createStyle } from 'styles';

export default createStyle({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: '$white',
  },
  avatar: {
    marginRight: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  time: {
    marginRight: 4,
    fontSize: 12,
    color: '#999999',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  item: {
    padding: 16,
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: '$white',
  },
  itemText: {
    fontSize: 14,
    color: '#333333',
  },
});
