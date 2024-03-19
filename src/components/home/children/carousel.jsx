import React, { useState, useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import Carousel from 'common/carousel';
import Image from 'common/image';
import useRequest from 'hooks/useRequest';
import { getCarouselData } from 'home/service';
import styles from 'home/style';

export default function HomeCarousel() {
  const [active, setActive] = useState(0);
  const { result } = useRequest(getCarouselData);

  const handlePress = useCallback((uri) => {
    if (uri) {
      if (uri.startsWith('http')) {
        NavigationService.navigate('WebPage', { uri });
      } else NavigationService.navigate({ path: uri });
    }
  }, []);

  return (
    !!result?.length && (
      <View style={styles.carouselContainer}>
        <Carousel style={styles.carousel} autoplay infinite afterChange={setActive}>
          {result.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => handlePress(item.linkUrl)}>
                <Image style={styles.carouselItem} resizeMode="cover" source={{ uri: item.tempUrl }} />
              </TouchableWithoutFeedback>
            );
          })}
        </Carousel>
        <View className="home-carousel-dot-container">
          {result.map((_, index) => (
            <View
              key={index}
              className={`home-carousel-dot ${active === index ? 'active' : ''}`}
              style={{ width: active === index ? 12 : 4 }}
            />
          ))}
        </View>
      </View>
    )
  );
}
