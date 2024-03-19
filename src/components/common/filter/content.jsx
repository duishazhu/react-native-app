import React, { useCallback } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Form } from '@terminus/nusi-mobile';
import Footer from 'common/footer';
import styles from 'common/filter/style';

import FieldDateRangePicker from 'common/field/date-range-picker';
import { FieldListRadio } from 'common/field/radio';
import StoreSelect from 'common/field/store-select';
import FieldButtonSelect from 'common/field/button-select';

function FieldStoreSelect(props) {
  return <StoreSelect {...props} clearAtDestroy={false} />;
}

const FIELD_TYPE_MAP = {
  dateRangePicker: FieldDateRangePicker,
  listRadio: FieldListRadio,
  storeSelect: FieldStoreSelect,
  select: FieldButtonSelect,
};

const FormField = Form.Field;

export default function FilterContent({ values, fields, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleReset = useCallback(() => {
    form.setFieldsValue(fields.reduce((current, item) => ({ ...current, [item.name]: undefined }), {}));
  }, [fields, form]);

  const handleSubmit = useCallback(() => {
    onSubmit(form.getFieldsValue());
    onCancel();
  }, [form, onCancel, onSubmit]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Form form={form} initialValues={values}>
          {fields.map(({ title, type, customProps, ...field }, index) => {
            const FieldComponent = typeof type === 'string' ? FIELD_TYPE_MAP[type] : type;
            return (
              <React.Fragment key={index}>
                <Text style={styles.fieldTitle}>{title}</Text>
                <FormField {...field}>
                  <FieldComponent {...customProps} />
                </FormField>
              </React.Fragment>
            );
          })}
        </Form>
      </ScrollView>
      <Footer
        actions={[
          { children: '重置', type: 'default', onPress: handleReset },
          { children: '完成', onPress: handleSubmit },
        ]}
      />
    </View>
  );
}
