import { createStyle } from 'styles';

export default createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '$white',
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
  },
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 0,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7F8FA',
    width: '100%',
  },
  searchIcon: {
    marginRight: 6,
    width: 14,
    height: 14,
  },
  input: {
    paddingRight: 0,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    minWidth: 240,
  },
  scanWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingHorizontal: 12,
  },
  rightContent: {
    marginLeft: 12,
  },
});
