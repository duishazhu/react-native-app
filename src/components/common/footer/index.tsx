import React, { useState, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Button from 'common/button';
import { ButtonProps } from '@terminus/nusi-mobile/lib/button/interface';
import FixBottomBar from 'common/fix-bottom-bar';
import styles from 'common/footer/style';

interface IProps {
  style?: any;
  children?: React.ReactElement | React.ReactNode;
  actions?: ButtonProps[];
  fixBottom?: boolean;
}

export default function Footer({ style, children, actions, fixBottom }: IProps) {
  const [visible, setVisible] = useState(false);

  const actionsContent = useMemo(() => {
    if (actions?.length) {
      if (actions.length < 3) {
        return actions.map((action, index) => {
          return (
            <View key={index} style={styles.item}>
              <Button style={styles.button} type="primary" size="large" children="确定" {...action} />
            </View>
          );
        });
      }
      const moreActions = [...actions];
      const outerAction = moreActions.pop();
      return (
        <>
          <View style={styles.item}>
            <Button style={styles.button} size="large" onPress={() => setVisible(true)}>
              更多
            </Button>
            {visible && (
              <View style={styles.overlay}>
                <View style={styles.overlayArrow} />
                {moreActions.map((action, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      disabled={action.disabled}
                      onPress={() => {
                        action.onPress();
                        setVisible(false);
                      }}
                    >
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
          <View style={styles.item}>
            <Button style={styles.button} type="primary" size="large" children="确定" {...outerAction} />
          </View>
        </>
      );
    }
    return null;
  }, [actions, visible]);

  return (
    <>
      {visible && (
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      )}
      <View style={[styles.container, style]}>
        {!!children && <View style={styles.item}>{children}</View>}
        {actionsContent}
        {visible && (
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.maskInner} />
          </TouchableWithoutFeedback>
        )}
      </View>
      {fixBottom && <FixBottomBar />}
    </>
  );
}

Footer.defaultProps = {
  fixBottom: true,
};
