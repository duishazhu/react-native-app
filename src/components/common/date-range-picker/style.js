import { createStyle } from 'styles';

export default createStyle({
  modalBodyStyle: {
    paddingHorizontal: 0,
  },
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  monthPickerText: {
    marginRight: 4,
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export const calendarTheme = {
  'stylesheet.calendar.main': {
    container: {},
    monthView: {},
    week: {
      flexDirection: 'row',
    },
  },
  'stylesheet.calendar.header': {
    header: {
      display: 'none',
    },
    week: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 30,
    },
    dayHeader: {
      flex: 1,
      fontSize: 12,
      color: '#333333',
      textAlign: 'center',
    },
  },
  'stylesheet.day.basic': {
    base: {
      position: 'relative',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: 54,
    },
    text: {
      fontSize: 16,
      color: '#333333',
    },
    selected: {
      backgroundColor: 'rgba(255, 228, 35, 0.1)',
    },
    today: {
      width: '100%',
    },
    selectedCircle: {
      width: '100%',
      height: 54,
      backgroundColor: '#FFE423',
      borderRadius: 4,
      color: '#333333',
    },
    selectedHead: {
      width: '100%',
      backgroundColor: '#FFE423',
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
    },
    selectedTail: {
      width: '100%',
      backgroundColor: '#FFE423',
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
    },
    selectedItemText: {
      color: '#333333',
    },
    selectedText: {
      color: '#333333',
    },
    disabledText: {
      color: '#C8C9CC',
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 2,
      borderRadius: 2,
      opacity: 0,
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: '#FFE423',
    },
    selectedDot: {
      backgroundColor: '#FFE423',
    },
    startEndText: {
      position: 'absolute',
      bottom: 4,
      width: '100%',
      fontSize: 10,
      lineHeight: 14,
      color: '#333333',
      textAlign: 'center',
    },
  },
};
