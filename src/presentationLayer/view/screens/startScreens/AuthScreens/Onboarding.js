import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import OnboardingComponent1 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent1';
import OnboardingComponent2 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent2';
import OnboardingComponent3 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent3';
import OnboardingComponent4 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent4';
import OnboardingComponent5 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent5';
import OnboardingComponent6 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent6';
import OnboardingComponent7 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent7';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B20,
  B22,
  B28,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPage = Math.floor(offsetX / pageWidth + 0.5);
    setCurrentPage(currentPage);
  };

  const handleNextPress = () => {
    const nextPage = currentPage + 1;
    if (nextPage < 7) {
      scrollViewRef.current?.scrollTo({
        x: nextPage * windowWidth,
        y: 0,
        animated: true,
      });
      setCurrentPage(nextPage); // 현재 페이지 상태 업데이트
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.onboardingContainer}>
      <View style={styles.header}>
        <View style={{...styles.headerItems, alignItems: 'flex-start'}}></View>

        <View style={{...styles.headerItems, alignItems: 'center'}}>
          <UNIQUE22>TIKKLE</UNIQUE22>
          {/* <B15>초간단 설명서</B15> */}
        </View>
        <View style={{...styles.headerItems, alignItems: 'flex-end'}}></View>
      </View>

      {/* <View style={styles.paginationWrapper}>
        {[...Array(3).keys()].map(index => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View> */}

      {/* <ScrollView
        horizontal
        pagingEnabled
        // scrollEnabled={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // 조정 가능한 값으로, 스크롤 이벤트의 빈도를 조절합니다.
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}> */}
      <OnboardingComponent1 />
      {/* <OnboardingComponent2 />
        <OnboardingComponent3 /> */}
      {/* </ScrollView> */}

      {/* {currentPage < 2 ? (
        <AnimatedButton style={styles.main_button} onPress={handleNextPress}>
          <B20 customStyle={{color: COLOR_WHITE}}>다음</B20>
        </AnimatedButton>
      ) : (
        <AnimatedButton
          style={styles.main_button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'main',
                },
              ],
            });
          }}>
          <B20 customStyle={{color: COLOR_WHITE}}>티클 시작하기</B20>
        </AnimatedButton>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: {
    width: windowWidth,
    height: windowHeight - HEADER_HEIGHT - StatusBarHeight,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    width: windowWidth,
  },
  headerItems: {
    // width: '33%',
    paddingTop: StatusBarHeight,
  },
  paginationWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
  },
  paginationDot: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: COLOR_SEPARATOR,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: COLOR_PRIMARY,
  },
  dotInactive: {
    backgroundColor: COLOR_SEPARATOR,
  },
  main_button: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth - 32,
    margin: 16,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    borderColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
