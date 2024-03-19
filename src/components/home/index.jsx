import React from 'react';
import { ScrollView } from 'react-native';
import BasePage from 'common/base-page';
import Image from 'common/image';
import Header from 'home/children/header';
import Carousel from 'home/children/carousel';
import Notice from 'home/children/notice';
import Apps from 'home/children/apps';
import Task from 'home/children/task';
import styles from 'home/style';
import 'home/index.scss';
import homeHeaderBg from 'images/home/home-header.png';

export default function Home() {
  return (
    <BasePage forceInset={{ bottom: 'never' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <Image style={styles.headerBg} source={homeHeaderBg} />
        <Header />
        <Carousel />
        <Notice />
        <Apps />
        <Task />
      </ScrollView>
    </BasePage>
  );
}
