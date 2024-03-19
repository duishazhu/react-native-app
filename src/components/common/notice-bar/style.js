import { createStyle } from 'styles';

export default createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
});
