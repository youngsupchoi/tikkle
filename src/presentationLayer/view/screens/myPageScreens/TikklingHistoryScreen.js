import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
} from '../../../components/Global/Spacing/BaseSpacing';
import {
  B,
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  M,
  M11,
  M15,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../../components/Global/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/Global/Headers/BackHeader';
import HistoryCarousel from '../../../components/PresentHistory/HistoryCarousel';
import {HistoryLoader} from '../../../components/Global/Skeletons/Skeletons';

export default function PresentHistoryScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Replace this with actual data fetch
  }, []);
  const carouselItems = [
    {
      id: 1,
      text: 'Item 1',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Bada55',
    },
    {
      id: 2,
      text: 'Item 2',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#C0ffee',
    },
    {
      id: 3,
      text: 'Item 3',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#F00dab',
    },
    {
      id: 4,
      text: 'Item 4',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Babe42',
    },
    {
      id: 5,
      text: 'Item 5',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Fa1afe',
    },
    {
      id: 6,
      text: 'Item 6',
      title: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#F0a2be',
    },
  ];

  return (
    <View style={styles.container}>
      <BackHeader style={{backgroundColor: COLOR_WHITE}}>선물 내역</BackHeader>

      {loading ? (
        <View
          style={{
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{width: windowWidth - 96, height: (windowWidth - 96) * 2}}>
            <HistoryLoader
              width={windowWidth}
              height={windowHeight}></HistoryLoader>
          </View>
        </View>
      ) : null}
      <View style={styles.historyCarouselContainer}>
        <HistoryCarousel data={carouselItems} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
  },
  historyCarouselContainer: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
