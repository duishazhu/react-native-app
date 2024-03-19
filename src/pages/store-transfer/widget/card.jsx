import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Price from 'pages/store-order/widget/price';
import { Icon } from 'common/icon';
import CustomField from 'common/field/customIndex';
import { InputItem, SwipeAction } from '@terminus/nusi-mobile';

const Card = ({ item, style, onPress, disable }) => {
  return (
    <SwipeAction
      style={style}
      contentStyle={{ borderRadius: 6, backgroundColor: '#fff' }}
      right={[
        {
          text: '删除',
          onPress: () => console.log('删除'),
          style: {
            backgroundColor: '#E65632',
            color: '#FFFFFF',
            fontSize: 14,
            width: 60,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
      ]}
    >
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 6 }}
            source="https://imgpub.chuangkit.com/designTemplate/2022/01/24/5c7408a5-00b8-4a8e-9733-49c4832e478b_thumb?v=1646065201000"
          />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: 500 }}>可口可乐{item.id}</Text>
              {disable ? null : (
                <TouchableOpacity onPress={() => onPress()}>
                  <Icon type="icon-minus" size="xs" />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                fontWeight: 500,
                color: '#999999',
                flexDirection: 'row',
                fontSize: 12,
                marginTop: 4,
                alignItems: 'center',
              }}
            >
              单位：瓶
              <View style={{ width: 1, height: 10, backgroundColor: '#EBEDF0', marginHorizontal: 10 }} />
              规格：1X1瓶
            </View>
            <Text style={{ color: '#999999', fontSize: 12, marginTop: 4 }}>条码：6922211811531</Text>
            <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
              <Text style={{ color: '#999999', fontSize: 10, marginRight: 12 }}>零售价</Text>
              <Price value="1.7" isAll={false} size={17} />
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <CustomField
              style={{ flex: 1, marginRight: 20 }}
              type="modalSelect"
              label="调拨批次"
              slot={disable ? <Text>20201234</Text> : null}
              customProps={{
                options: [
                  { label: '111', value: '11' },
                  { label: '22', value: '22' },
                ],
              }}
            />
            <CustomField style={{ flex: 1 }} label="批次库存" slot={<Text>0</Text>} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CustomField
              style={{ flex: 1, marginRight: 20 }}
              label="调拨单价"
              slot={
                disable ? (
                  <Text>2.00</Text>
                ) : (
                  <InputItem
                    alignment="left"
                    style={{
                      padding: 0,
                      height: 30,
                      backgroundColor: '#F7F8FA',
                      width: 98,
                      borderRadius: 4,
                      paddingHorizontal: 8,
                    }}
                  />
                )
              }
            />
            <CustomField
              label="调拨数量"
              style={{ flex: 1 }}
              slot={
                disable ? (
                  <Text>2.00</Text>
                ) : (
                  <InputItem
                    alignment="left"
                    style={{
                      padding: 0,
                      height: 30,
                      backgroundColor: '#F7F8FA',
                      width: 98,
                      borderRadius: 4,
                      paddingHorizontal: 8,
                    }}
                  />
                )
              }
            />
          </View>
        </View>
      </View>
    </SwipeAction>
  );
};

export default Card;
