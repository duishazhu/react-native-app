import { createStyle } from 'styles';

export default createStyle({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '$white',
    borderRadius: 8,
  },
  header: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomColor: '#EBEDF0',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  body: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  footerRight: {
    flex: 1,
  },
});

export const actionsStyles = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionMoreContainer: {
    flex: 1,
  },
  actionMore: {
    position: 'relative',
    zIndex: 9,
    paddingVertical: 6,
    paddingRight: 10,
  },
  actionMoreText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999999',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 32,
    minWidth: 90,
    backgroundColor: '$white',
    borderRadius: 6,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  overlayArrow: {
    position: 'absolute',
    left: 6,
    top: -4,
    width: 10,
    height: 10,
    backgroundColor: '$white',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  overlayItem: {
    padding: 12,
    backgroundColor: '$white',
    borderRadius: 6,
  },
  overlayItemText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
  },
  disabledText: {
    color: '#999999',
  },
  action: {
    marginLeft: 10,
  },
});

export const panelStyles = createStyle({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#F7F7F7',
    borderRadius: 6,
  },
});
