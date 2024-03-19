import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { Loading, Form, Toast } from '@terminus/nusi-mobile';
import { NavigationService } from '@terminus/react-navigation';
import BasePage from 'common/base-page';
import Footer from 'common/footer';
import Field from 'common/field';
import useRequest from 'hooks/useRequest';

const FormField = Form.Field;

export default function BusinessTimeChange() {
  const [form] = Form.useForm();

  const { loading, executor } = useRequest(() => {}, { immediate: false });

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      console.log('❗️❗️❗️ ~ handleSubmit ~ values:', values);
      await executor(values);
      NavigationService.goBack();
    } catch (error) {
      Toast.info(error.errorFields?.[0]?.errors?.[0] || error.message);
    }
  }, [executor, form]);

  return (
    <BasePage title="营业时间修改">
      <Loading visible={loading} toast />
      <ScrollView>
        <Form form={form}>
          <FormField name="time" rules={[{ required: true, message: '请选择营业时间' }]}>
            <Field label="营业时间" type="timeRangePicker" />
          </FormField>
        </Form>
      </ScrollView>
      <Footer actions={[{ children: '提交', onPress: handleSubmit }]} />
    </BasePage>
  );
}
