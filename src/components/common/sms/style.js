import { createStyle } from 'styles/theme';
import { isWeb } from 'utils/platform';

const style = createStyle({
  sendBtn: {
    borderWidth: 0,
  },
  sendText: {
    fontSize: 14,
    lineHeight: isWeb ? 32 : 28,
    color: '#333333',
  },
});
export default style;
