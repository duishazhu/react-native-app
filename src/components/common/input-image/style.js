import { createStyle } from 'styles/theme';
import { isAndroid } from 'utils/platform';

export default createStyle({
  contentContainer: {
    padding: 16,
    paddingBottom: 4,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    borderRadius: 6,
  },
  inputContainer: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    marginTop: isAndroid ? -30 : 0,
    height: 88,
    paddingTop: 0,
  },
  count: {
    width: '100%',
    textAlign: 'right',
    color: '#9e9e9e',
  },
  selectImage: {
    borderWidth: 1,
    borderColor: '$colorBorder',
    padding: 11,
    width: 52,
    alignItems: 'center',
  },
  deleteContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '$colorBtnText',
    fontSize: 14,
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 13,
    color: 'rgba(200, 201, 204, 1)',
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});
