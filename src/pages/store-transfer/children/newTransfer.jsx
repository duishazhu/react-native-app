import React from 'react';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Field from 'common/field';
import Footer from 'common/footer';

const NewTransfer = () => {
  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      title="新建调拨单"
      leftIconName="icon-back"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Field
        type="radio"
        label="调拨类型"
        value={1}
        customProps={{
          options: [
            { label: '调入', value: 1 },
            { label: '调出', value: 2 },
          ],
        }}
      />
      <Field type="storeSelect" label="调出门店" />
      <Field type="storeSelect" label="调入门店" />
      <Field style={{ alignItems: 'flex-start' }} type="textarea" label="备注" />
      <Footer
        style={{ marginTop: 'auto' }}
        actions={[
          {
            children: '添加商品',
            onPress: () => {
              NavigationService.navigate('AddGoods');
            },
          },
        ]}
      />
    </BasePage>
  );
};

export default NewTransfer;
