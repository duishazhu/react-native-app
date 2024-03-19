import { createStyle } from 'styles';

export default createStyle({
  container: {
    position: 'relative',
    paddingVertical: 12,
    paddingRight: 30,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    paddingLeft: 12,
  },
});
