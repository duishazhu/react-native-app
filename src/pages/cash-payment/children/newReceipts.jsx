import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Footer from 'common/footer';
import Field from 'common/field';
import Upload from 'common/upload';

const NewReceipts = () => {
  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="新建缴款单"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Field label="申请门店" type="modalSelect" customProps={{ options: [] }} />
      <Field label="缴款金额" type="input" />
      <Field label="现金结余" type="input" />
      <Field label="缴款日" type="datePicker" />
      <Field label="备注" type="textarea" customProps={{ count: 100 }} />
      <View style={{ padding: 16, marginTop: 10, backgroundColor: '#fff' }}>
        <Text style={{ color: '#666666', marginBottom: 12 }}>
          上传附件<Text style={{ color: '#C8C9CC' }}>（必填）</Text>
        </Text>
        <Upload />
        <Text style={{ color: '#969799', fontSize: 12, marginTop: 8 }}>请上传缴款凭证，最多5张</Text>
      </View>
      <Footer
        style={{ marginTop: 'auto' }}
        actions={[{ children: '保存', type: 'default' }, { children: '提交审核' }]}
      />
    </BasePage>
  );
};

export default NewReceipts;
