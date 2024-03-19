import { commonStyle, createStyle } from 'styles';

export default createStyle({
  commonModal: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    height: '100%',
  },
  modalHeader: {
    position: 'relative',
    ...commonStyle._flexRow,
    paddingHorizontal: 16,
    height: 48,
    minHeight: 48,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },
  modalTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBody: {
    paddingHorizontal: 16,
  },
  modalFooter: {
    paddingHorizontal: 16,
    height: 50,
  },
});

export const centerStyles = createStyle({
  modal: {
    overflow: 'hidden',
    width: '83%',
    height: '65%',
    borderRadius: 16,
    backgroundColor: '$white',
  },
  modalHeader: {
    ...commonStyle._flexRow,
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 50,
    minHeight: 50,
    borderBottomColor: '#EBEDF0',
    borderBottomWidth: 0.5,
  },
  modalTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  footer: {
    paddingBottom: 8,
    height: 60,
    minHeight: 60,
    borderTopColor: '#EBEDF0',
    borderTopWidth: 0.5,
  },
});
