import React, { PropsWithChildren, useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Checkbox } from '@terminus/nusi-mobile';
import { ButtonProps } from '@terminus/nusi-mobile/lib/button/interface';
import Modal from 'common/modal';
import Footer from 'common/footer';
import styles from 'common/modal-select/style';

type Option = Record<string, any>;

type Value = number | string;

interface IProps<T> {
  title?: string;
  alignment?: 'right' | 'left';
  options: T[];
  labelKey?: string;
  valueKey?: string;
  renderItem?: (item: T, selected: boolean) => React.ReactElement | React.ReactNode;
  multiple?: boolean;
  value?: Value | Value[];
  onConfirm?: (value: Value | Value[]) => void;
  extraActions?: ButtonProps[];
}

export default function ModalSelect({
  title,
  alignment,
  options,
  labelKey,
  valueKey,
  renderItem,
  multiple,
  value: defaultValue,
  onConfirm,
  extraActions,
  children,
}: PropsWithChildren<IProps<Option>>) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<Value | Value[]>();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = useCallback(
    (v: Value) => {
      if (multiple) {
        setValue((prev: Value[]) => {
          return prev?.includes(v) ? prev.filter((item) => item !== v) : [...(prev || []), v];
        });
      } else setValue(v);
    },
    [multiple]
  );

  const handleConfirm = useCallback(() => {
    onConfirm(value);
    setVisible(false);
  }, [onConfirm, value]);

  const renderFooter = useCallback(() => {
    const actions = (extraActions || []).map((action) => ({
      ...action,
      onPress: (e) => {
        action.onPress(e);
        setVisible(false);
      },
    }));
    actions.push({ onPress: handleConfirm });
    return <Footer actions={actions} />;
  }, [extraActions, handleConfirm]);

  const content = useMemo(() => {
    return React.cloneElement(children as React.ReactElement, { onPress: () => setVisible(true) });
  }, [children]);

  return (
    <>
      {content}
      <Modal
        style={styles.selectModal}
        visible={visible}
        title={title}
        footerProps={{ renderFooter }}
        onClose={() => setVisible(false)}
      >
        {options.map((option) => {
          const selected = multiple ? (value as Value[])?.includes(option[valueKey]) : option[valueKey] === value;
          return (
            <TouchableWithoutFeedback key={option[valueKey]} onPress={() => handleChange(option[valueKey])}>
              <View style={styles.item}>
                {alignment === 'left' && (
                  <Checkbox
                    style={{ marginRight: 8 }}
                    styles={{ icon: styles.checkboxIcon }}
                    checked={selected}
                    onChange={() => {}}
                  />
                )}
                <View style={styles.content}>
                  {typeof renderItem === 'function' ? (
                    renderItem(option, selected)
                  ) : (
                    <Text style={[styles.text, selected && styles.selectedText]}>{option[labelKey]}</Text>
                  )}
                </View>
                {alignment === 'right' && (
                  <Checkbox
                    style={{ marginLeft: 8 }}
                    styles={{ icon: styles.checkboxIcon }}
                    checked={selected}
                    onChange={() => {}}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </Modal>
    </>
  );
}

ModalSelect.defaultProps = {
  title: '请选择',
  alignment: 'right',
  labelKey: 'label',
  valueKey: 'value',
};
