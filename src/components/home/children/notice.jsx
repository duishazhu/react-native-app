import React from 'react';
import { View, Text } from 'react-native';
// import { NavigationService } from '@terminus/react-navigation';
import Carousel from 'common/carousel';
import Image from 'common/image';
import useRequest from 'hooks/useRequest';
import styles from 'home/style';
import noticeIcon from 'images/home/notice.png';

const mockData = [
  '2月28日上报预估已开始，请立即上报预估！',
  '2月29日上报预估已开始，请立即上报预估！',
  '2月30日上报预估已开始，请立即上报预估！',
];

export default function Notice() {
  const { result } = useRequest(() => mockData);

  return (
    !!result?.length && (
      <View style={styles.notice}>
        <Image style={styles.noticeLabel} source={noticeIcon} />
        <Carousel style={styles.noticeContent} vertical autoplayInterval={3000} autoplay dots={false} infinite>
          {result.map((item, index) => {
            return (
              <Text key={index} style={styles.noticeText} numberOfLines={1}>
                {item}
              </Text>
            );
          })}
        </Carousel>
      </View>
    )
  );
}
