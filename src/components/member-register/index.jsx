import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { Loading, Form, Toast } from '@terminus/nusi-mobile';
import { NavigationService } from '@terminus/react-navigation';
import BasePage from 'common/base-page';
import Field from 'common/field';
import FieldHidden from 'common/field/hidden';
import useStoreInfo from 'hooks/useStoreInfo';
import useRequest from 'hooks/useRequest';
import { MOBILE_NUMBER_REG } from 'common/constants';
import { showConfirmDialog } from 'common/helper';
import { memberRegister } from 'member-register/service';
import Button from 'common/button';

const FormField = Form.Field;

const sexOptions = [
  { label: '男', value: 'MALE' },
  { label: '女', value: 'FEMALE' },
];

export default function MemberRegister() {
  const { storeInfo } = useStoreInfo();
  const [form] = Form.useForm();

  const { loading, executor } = useRequest(memberRegister, { immediate: false });

  const handleSubmit = useCallback(async () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await executor(values, { quiet: true });
          showConfirmDialog('注册成功', '会员已注册成功', () => form.resetFields(), {
            okText: '继续注册',
            cancelText: '确定',
            onCancel: () => NavigationService.goBack(),
          });
        } catch (error) {
          showConfirmDialog(
            '注册失败',
            error.errorFields?.[0]?.errors?.[0] || error.message,
            () => form.resetFields(),
            {
              okText: '重新注册',
              cancelText: '我知道了',
            }
          );
        }
      })
      .catch((err) => {
        Toast.info(err.errorFields?.[0]?.errors?.[0]);
      });
  }, [executor, form]);

  return (
    <BasePage title="会员注册">
      <Loading visible={loading} toast />
      <ScrollView>
        <Form form={form}>
          <FieldHidden name="storeId" initialValue={storeInfo?.id} />
          <FieldHidden name="storeName" initialValue={storeInfo?.name} />
          <FormField
            name="memberMobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: MOBILE_NUMBER_REG,
                message: '请输入正确的手机号',
              },
            ]}
          >
            <Field
              label="手机号码"
              type="input"
              customProps={{ placeholder: '请输入(必填)', keyboardType: 'phone-pad', maxLength: 11 }}
            />
          </FormField>
          <FormField name="memberName">
            <Field label="姓名" type="input" customProps={{ placeholder: '请输入', maxLength: 20 }} />
          </FormField>
          <FormField name="memberGenderDict">
            <Field label="性别" type="radio" customProps={{ options: sexOptions }} />
          </FormField>
          <FormField name="memberBirthdayDate">
            <Field
              label="出生日期"
              type="datePicker"
              customProps={{ placeholder: '请选择(填写后不可更改)', format: 'YYYY-MM-DD' }}
            />
          </FormField>
        </Form>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, marginBottom: 15 }}>
        <Button type="primary" onPress={handleSubmit} style={{ width: '100%', height: 40, borderRadius: 20 }}>
          提交
        </Button>
        <Button
          type="default"
          onPress={() => {
            NavigationService.goBack();
          }}
          style={{ marginTop: 10, width: '100%', height: 40, borderRadius: 20 }}
        >
          取消
        </Button>
      </View>
    </BasePage>
  );
}
