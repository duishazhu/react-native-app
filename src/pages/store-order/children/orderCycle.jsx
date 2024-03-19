import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import { useQuery } from '@terminus/octopus-hooks';
import { Icon } from 'common/icon';
import Button from 'common/button';
import Modal from 'common/modal';
import { Checkbox } from '@terminus/nusi-mobile';
import Prcie from '../widget/price';

const tags = [1, 2, 3, 4, 5, 6, 7];

const Input = ({ label, value, onPress }) => {
  return (
    <View
      style={{
        height: 44,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#646566', marginRight: 16, height: 18 }}>{label}</Text>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}
      >
        {value ? <Text style={{ color: '#333333' }}>{value}</Text> : <Text style={{ color: '#C8C9CC' }}>请选择</Text>}
        <Icon size="xs" color="#7D7E80" type="icon-arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const Convention = () => {
  const { title } = useQuery();
  const [activeTag, setActiveTag] = useState(tags[0]);
  const [visible, setVisible] = useState(false);
  const isSpecial = useMemo(() => {
    return title === '专题订货';
  }, [title]);

  const TemplateChecked = () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onChange={(val) => setChecked(val)}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 500, color: '#333333' }}>春季常规要货模板20231221</Text>
            {isSpecial ? <Text style={{ fontSize: 12, color: '#FF455B' }}>3天后结束</Text> : null}
          </View>
          <Text style={{ fontSize: 12, color: '#666666', marginTop: 4 }}>适用于春季常规要货适用于春季常规要货</Text>
          <View style={{ marginTop: 8, flexDirection: 'row' }}>
            {isSpecial ? (
              <Text style={{ color: '#999999', fontSize: 12 }}>要货时间：2023.12.24 12:23:42-2023.12.31 12:23:11</Text>
            ) : (
              <React.Fragment>
                <Text style={{ fontSize: 12, color: '#999999' }}>品项:5</Text>
                <Text style={{ fontSize: 12, color: '#999999', marginLeft: 8 }}>数量:5</Text>
                <Prcie style={{ marginLeft: 'auto' }} value="1024.88" />
              </React.Fragment>
            )}
          </View>
        </View>
      </Checkbox>
    );
  };

  return (
    <BasePage
      style={{ backgroundColor: '#F5F5F5' }}
      leftIconName="icon-back"
      title={title}
      onLeftClick={() => NavigationService.goBack()}
    >
      <Input label="要货门店" />
      {isSpecial ? (
        <Input label="要货专题" onPress={() => setVisible(true)} />
      ) : (
        <Input onPress={() => setVisible(true)} label="推荐模板" />
      )}
      {title === '常规要货' ? (
        <View style={{ padding: 16, backgroundColor: '#fff', marginTop: 10 }}>
          <Text style={{ fontWeight: 700 }}>要货缺货量</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15, paddingBottom: 4 }}>
            {tags.map((el) => {
              return (
                <TouchableOpacity onPress={() => setActiveTag(el)}>
                  <View
                    style={[
                      {
                        width: 68,
                        height: 24,
                        backgroundColor: '#F6F6F6',
                        borderRadius: 16,
                        color: '#333333',
                        marginRight: 10,
                        marginBottom: 12,
                        textAlign: 'center',
                        fontSize: 12,
                        lineHeight: 24,
                      },
                      activeTag === el ? { backgroundColor: 'rgba(255, 136, 0, 0.1)', color: '#FF8800' } : {},
                    ]}
                  >
                    {el}天
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : null}
      <View style={{ marginTop: 'auto', paddingHorizontal: 16 }}>
        <Button type="primary" onPress={() => NavigationService.navigate('Confirmation', { title })}>
          新建
        </Button>
      </View>
      <Modal
        style={{ height: 400 }}
        title={isSpecial ? '要货专题' : '选择模板'}
        visible={visible}
        onClose={() => setVisible(false)}
        popup
      >
        <TemplateChecked />
      </Modal>
    </BasePage>
  );
};

export default Convention;
