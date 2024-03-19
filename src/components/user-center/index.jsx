import React from 'react';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { useCommonData } from '@terminus/mall-base';
import BasePage from 'common/base-page';
import { Icon } from 'common/icon';
import useRequest from 'hooks/useRequest';
import { commonStyle } from 'styles';
import styles from 'user-center/style';

const mockData = {
  name: '周杰伦',
  avatar: 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/common/default-avatar.png',
  time: '07:00-22:00',
  roles: ['移动端定店', '质量预警-管理员', '正式-线下督导经理'],
};

export default function UserCenter() {
  const { user } = useCommonData();
  const { result } = useRequest(() => mockData);

  return (
    <BasePage title="个人中心">
      <TouchableWithoutFeedback onPress={() => NavigationService.navigate('BusinessTimeChange')}>
        <View style={styles.main}>
          <View style={commonStyle.flexRow}>
            <Image style={styles.avatar} source={{ uri: user?.avatar }} />
            <Text style={styles.name}>{user?.nickname}</Text>
          </View>
          <View style={commonStyle.flexRow}>
            <Text style={styles.time}>营业时间：07:00-22:00</Text>
            <Icon type="icon-arrow-right" color="#999999" size={12} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {!!result && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {result.roles.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </BasePage>
  );
}
