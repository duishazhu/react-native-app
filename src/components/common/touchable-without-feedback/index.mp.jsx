import React from 'react';

const TouchableWithoutFeedback = ({ onPress, ...restProps }) => {
  const child = React.Children.only(restProps.children);

  return React.cloneElement(child, { ...restProps, ...child.props, onClick: onPress }, child.props.children);
};

export default TouchableWithoutFeedback;
