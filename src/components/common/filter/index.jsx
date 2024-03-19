import React, { useMemo, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Drawer } from '@terminus/nusi-mobile';
import { Icon } from 'common/icon';
import FilterContent from 'common/filter/content';
import useStoreSelect from 'hooks/useStoreSelect';
import { commonStyle } from 'styles';
import styles from 'common/filter/style';

function StoreSelectHelper({ multiple }) {
  useStoreSelect({ multiple });
  return null;
}

export default function Filter({ children, fields, ...props }) {
  const [visible, setVisible] = useState(false);

  const handleShow = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const content = useMemo(() => {
    if (children) {
      return React.cloneElement(children, { onPress: handleShow });
    }
    return (
      <TouchableWithoutFeedback onPress={handleShow}>
        <View style={[commonStyle.flexRow, { minWidth: 40 }]}>
          <Icon type="filter" size={14} />
          <Text style={styles.filterText}>筛选</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [children]);

  const storeSelectFields = useMemo(() => fields.filter((field) => field.type === 'storeSelect'), [fields]);

  return (
    <>
      {content}
      {storeSelectFields.map((storeSelectField) => (
        <StoreSelectHelper key={storeSelectField.name} multiple={storeSelectField.customProps?.multiple} />
      ))}
      <Drawer
        visible={visible}
        position="right"
        sidebar={<FilterContent {...props} fields={fields} onCancel={handleCancel} />}
        onClose={handleCancel}
      />
    </>
  );
}
