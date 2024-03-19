import { createStyle } from 'styles/theme';

export default createStyle({
  defaultContainer: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 2,
  },
  smallContainer: {
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  defaultText: {
    fontSize: 12,
    lineHeight: 18,
  },
  smallText: {
    fontSize: 9,
    lineHeight: 14,
  },
  infoContainer: {
    backgroundColor: 'rgba(69, 137, 255, 0.1)',
  },
  infoBorderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(69, 137, 255, 1)',
  },
  infoText: {
    color: 'rgba(69, 137, 255, 1)',
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 136, 0, 0.1)',
  },
  warningBorderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 136, 0, 1)',
  },
  warningText: {
    color: 'rgba(255, 136, 0, 1)',
  },
  dangerContainer: {
    backgroundColor: 'rgba(238, 10, 36, 0.1)',
  },
  dangerBorderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(238, 10, 36, 1)',
  },
  dangerText: {
    color: 'rgba(238, 10, 36, 1)',
  },
  successContainer: {
    backgroundColor: 'rgba(0, 191, 45, 0.1)',
  },
  successBorderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 45, 1)',
  },
  successText: {
    color: 'rgba(0, 191, 45, 1)',
  },
  disabledContainer: {
    backgroundColor: 'rgba(153, 153, 153, 0.1)',
  },
  disabledBorderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(153, 153, 153, 1)',
  },
  disabledText: {
    color: 'rgba(153, 153, 153, 1)',
  },
});
