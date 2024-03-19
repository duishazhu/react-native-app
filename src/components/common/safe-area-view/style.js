import { createStyle } from 'styles/theme';

const defaultStyle = {
  bcColor: '$colorBackground',
  primaryColor: '$primaryColor',
};

const rootStyles = createStyle({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: defaultStyle.bcColor,
  },
  fixStatusBar: {
    backgroundColor: defaultStyle.bcColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  },
});

export default rootStyles;
