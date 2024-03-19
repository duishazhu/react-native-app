import { createStyle } from 'styles';

export default createStyle({
  container: {
    position: 'relative',
    zIndex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    height: 50,
    minHeight: 50,
    backgroundColor: '$white',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 8,
    width: '100%',
    height: '100%',
  },
  maskInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  item: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    bottom: 57,
    minWidth: 90,
    backgroundColor: '$white',
    borderRadius: 6,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  overlayArrow: {
    position: 'absolute',
    left: 12,
    bottom: -4,
    width: 10,
    height: 10,
    backgroundColor: '$white',
    transform: [{ rotate: '45deg' }],
  },
  overlayItem: {
    padding: 12,
  },
  overlayItemText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
  },
  disabledText: {
    color: '#999999',
  },
});
