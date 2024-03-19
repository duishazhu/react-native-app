import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Button from 'common/button';
import { ButtonProps } from '@terminus/nusi-mobile/lib/button/interface';
import { actionsStyles as styles } from 'common/card/style';

interface IProps {
  style?: any;
  maxLength?: number;
  actions?: ButtonProps[];
}

export default function CardActions({ style, maxLength, actions }: IProps) {
  const [visible, setVisible] = useState(false);

  if (actions?.length) {
    if (actions.length <= maxLength) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.actionMoreContainer} />
          {actions.map((action, index) => {
            return <Button key={index} style={[styles.action, action.styles]} type="primary" {...action} />;
          })}
        </View>
      );
    }
    const moreActions = [...actions];
    const outerActions = moreActions.splice(-maxLength, maxLength);
    return (
      <View style={[styles.container, style]}>
        <View style={styles.actionMoreContainer}>
          <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
            <View style={styles.actionMore}>
              <Text style={styles.actionMoreText}>更多</Text>
              {visible && (
                <View style={styles.overlay}>
                  <View style={styles.overlayArrow} />
                  {moreActions.map((action, index) => {
                    return (
                      <TouchableWithoutFeedback key={index} disabled={action.disabled} onPress={action.onPress}>
                        <View style={styles.overlayItem}>
                          <Text style={[styles.overlayItemText, action.disabled && styles.disabledText]}>
                            {action.children}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {outerActions.map((action, index) => {
          return <Button key={index} style={[styles.action, action.styles]} type="primary" {...action} />;
        })}
      </View>
    );
  }
  return null;
}

CardActions.defaultProps = {
  maxLength: 3,
};
