import { createStyle } from 'styles';

const styles = createStyle({
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const baseStyles = createStyle({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginRight: 12,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#333333',
  },
  subInfoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subInfoText: {
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(153, 153, 153, 1)',
  },
  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
  subInfo: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(153, 153, 153, 1)',
  },
  subInfoExtra: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(153, 153, 153, 1)',
  },
});

export const specificationStyles = createStyle({
  ...styles,
  modalFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },

  modalFooterBtn: {
    width: 100,
    height: 40,
    borderRadius: 20,
  },

  modalSubTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  specificationTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#333333',
  },
  specificationSubTitle: {
    fontSize: 11,
    color: '#999999',
  },
});

export default styles;
