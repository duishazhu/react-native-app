import { createStyle } from 'styles/theme';

export const privacyStyle = createStyle({
  modal: {
    height: 394,
    width: 311,
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: 'auto',
    backgroundColor: '#ffffff',
  },
  centerModalImage: {
    borderRadius: 16,
    height: 145,
  },
  protocolBtn: {
    color: '$primaryColor',
  },
  inline: {
    fontSize: 14,
    lineHeight: 18,
    color: '$colorTextAssist',
    display: 'inline',
  },
  privacyModalContent: {
    padding: 22,
    marginTop: 118,
    position: 'relative',
  },
  centerModalTitle: {
    color: '#323233',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: 'center',
  },
  contentHeight: {
    height: 102,
  },
  privacyContent: {
    color: '#333333',
    lineHeight: 20,
    display: 'inline-block',
  },
  protocolSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  protocolLabel: {
    fontSize: 12,
    color: '#333333',
  },
  protocolValue: {
    fontSize: 12,
    color: '$primaryColor',
  },
  privacyBottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    width: '100%',
    color: '#333333',
    marginTop: 14,
    lineHeight: 40,
  },
  toSubmitButton: {
    backgroundColor: '#FFE423',
    borderWidth: 0,
  },
  agreeButton: {
    flex: 1,
  },
  agreeButtonMargin: {
    marginLeft: 15,
  },
});
