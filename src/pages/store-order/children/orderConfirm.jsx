import React from 'react';
import { View } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Field from 'common/field';
import Button from 'common/button';
import { Modal } from '@terminus/nusi-mobile';
import Search from '../widget/search';
import Footer from '../widget/footer';
import Header from '../widget/header';

const OrderConfirm = () => {
  const handleSubmit = () => {
    const affirm = () => {
      console.log(1);
      close();
    };
    const close = Modal.alert({
      title: null,
      remark: '所选商品存在多个发货仓，系统将自动拆单',
      render: () => {
        return (
          <View style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
            <Button type="primary" transparent capsule onPress={affirm} size="small">
              我已知晓，确认提交
            </Button>
          </View>
        );
      },
    });
  };

  return (
    <BasePage
      style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
      leftIconName="icon-back"
      title="订单确认"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Search />
      <Header />
      <Field type="input" label="单据备注" customProps={{ placeholder: '填写单据备注' }} />
      <View style={{ flex: 1 }}>1</View>
      <Footer
        values={{ num: 1, item: 1 }}
        btns={[
          <Button style={{ marginRight: 10 }}>继续编辑</Button>,
          <Button type="primary" onPress={handleSubmit}>
            提交
          </Button>,
        ]}
      />
    </BasePage>
  );
};

export default OrderConfirm;
