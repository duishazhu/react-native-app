import { createStyle } from 'styles';

export default createStyle({
  container: {
    margin: -4,
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  imageTouchWrap: {
    position: 'relative',
    paddingTop: '100%',
    width: '100%',
  },
  uploadIconWrap: {
    width: '100%',
    height: 'unset',
    'aspect-ratio': '1',
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});
