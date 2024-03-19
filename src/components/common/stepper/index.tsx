/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Stepper as OriginStepper } from '@terminus/nusi-mobile';
import { StepperProps } from '@terminus/nusi-mobile/lib/stepper/interface';
import { Icon } from 'common/icon';
import styles from 'common/stepper/style';

const sizeMap = {
  small: 16,
  middle: 22,
};

export interface CustomStepperProps extends StepperProps {
  showSelect?: boolean;
  onSelectAdd?: () => void;
}

export default function Stepper(props: CustomStepperProps) {
  const { disabled, style, value, step = 1, max, size = 'middle', onChange, showSelect = false, onSelectAdd } = props;

  const handleAdd = useCallback(() => {
    if (onSelectAdd) {
      onSelectAdd();
      return;
    }
    if (!max || step <= max) {
      onChange(step, { addButtonDisabled: step * 2 > max, reduceButtonDisabled: false });
    }
  }, [max, onChange, step, onSelectAdd]);

  if (value) {
    return (
      <View style={[styles.container, style]}>
        <OriginStepper
          reduceButtonStyle={disabled ? styles.reduceDisabledButtonStyle : styles.reduceButtonStyle}
          addButtonStyle={disabled ? styles.addDisabledButtonStyle : styles.addButtonStyle}
          inputStyle={{ marginHorizontal: 4, backgroundColor: 'transparent', lineHeight: sizeMap[size] }}
          {...props}
          // @ts-ignore
          style={[styles.wrapper, props.style]}
        />
      </View>
    );
  }

  const addDisable = showSelect ? false : disabled;
  return (
    <TouchableWithoutFeedback disabled={addDisable} onPress={handleAdd}>
      <View style={[styles.container, style]}>
        <Icon type={addDisable ? 'icon-step-add-disabled' : 'icon-step-add'} size={sizeMap[size]} />
      </View>
    </TouchableWithoutFeedback>
  );
}
