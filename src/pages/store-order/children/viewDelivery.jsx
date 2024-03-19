import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Button from 'common/button';
import { Accordion, Checkbox, Toast, InputItem } from '@terminus/nusi-mobile';
import Search from '../widget/search';
import Header from '../widget/header';
import Prcie from '../widget/price';
import CustomModal from '../widget/custom-modal';
import Info from '../widget/info';

const data_ = [
  { label: 1, active: false, value: [1, 2, 3] },
  { label: 2, active: false, value: [1, 2] },
  { label: 3, active: false, value: [1] },
];

const ViewDelivery = () => {
  const [data, setData] = React.useState(data_);
  const [checkVal, setCheckVal] = React.useState({
    pass: true,
    text: '',
  });
  const [visible, setVisible] = React.useState(false);
  const [activeSections, setActiveSections] = React.useState([]);
  const onChange = (activeSection) => {
    console.log(activeSection);
    setActiveSections(activeSection);
  };

  const handleSelect = (val, index) => {
    const copyData = [...data];
    copyData[index].active = val;
    setData(copyData);
  };
  const handlePass = (val) => {
    setCheckVal({ ...checkVal, pass: val });
  };

  const handleCheck = () => {
    if (!data.some((el) => el.active)) {
      Toast.info('请选择计划单！');
      return;
    }
    setVisible(true);
  };

  const BoxHeader = ({ el, index }) => {
    return (
      <Checkbox checked={el.active} onChange={(value) => handleSelect(value, index)}>
        {`计划单(ZGYH00001020231103-${el.label})`}
      </Checkbox>
    );
  };
  return (
    <BasePage
      style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
      leftIconName="icon-back"
      title="查看配送"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Search />
      <Header />
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Accordion onChange={onChange} activeSections={activeSections}>
          {data.map((el, index) => {
            return (
              <Accordion.Panel header={<BoxHeader el={el} index={index} />}>
                <View style={{ paddingHorizontal: 16 }}>
                  {el.value.map(() => {
                    return <Info />;
                  })}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 14,
                      paddingBottom: 10,
                    }}
                  >
                    <Text>单据备注</Text>
                    <Prcie label="总计" />
                  </View>
                </View>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button type="primary" onPress={handleCheck}>
          审核
        </Button>
      </View>
      <CustomModal title="审核" show={visible} onCancel={() => setVisible(false)}>
        <Text style={{ color: '#666666', marginTop: 12 }}>
          <Text style={{ color: '#EE0A24' }}>*</Text>
          审核结果
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 20 }}>
          <Checkbox checked={checkVal.pass} onChange={() => handlePass(true)}>
            审核通过
          </Checkbox>
          <Checkbox style={{ marginLeft: 34 }} onChange={() => handlePass(false)} checked={!checkVal.pass}>
            审核驳回
          </Checkbox>
        </View>
        <Text style={{ color: '#666666', marginBottom: 12 }}>审核意见</Text>
        <InputItem style={{ backgroundColor: '#F7F8FA' }} inline={false} rows={3} count={100} />
      </CustomModal>
    </BasePage>
  );
};

export default ViewDelivery;
