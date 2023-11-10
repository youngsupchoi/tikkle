import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import {HEADER_HEIGHT} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import OnboardingComponent1 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent1';
import OnboardingComponent2 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent2';
import OnboardingComponent3 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent3';
import OnboardingComponent4 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent4';
import OnboardingComponent5 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent5';
import OnboardingComponent6 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent6';
import OnboardingComponent7 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent7';

import {
  B15,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';

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
    if (nextPage < 6) {
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
        <View style={{...styles.headerItems, alignItems: 'flex-start'}}>
          {currentPage < 6 && ( // 마지막 페이지가 아닐 경우에만 렌더링
            <AnimatedButton
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
              <B15 customStyle={{color: COLOR_GRAY}}>건너뛰기</B15>
            </AnimatedButton>
          )}
        </View>

        <View style={{...styles.headerItems, alignItems: 'center'}}>
          <UNIQUE22>TIKKLE</UNIQUE22>
        </View>
        <View style={{...styles.headerItems, alignItems: 'flex-end'}}>
          {currentPage < 6 ? (
            <AnimatedButton onPress={handleNextPress}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>다음</B15>
            </AnimatedButton>
          ) : null}
        </View>
      </View>

      <View style={styles.paginationWrapper}>
        {[...Array(7).keys()].map(index => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16} // 조정 가능한 값으로, 스크롤 이벤트의 빈도를 조절합니다.
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}>
        <OnboardingComponent1 />
        <OnboardingComponent2 />
        <OnboardingComponent3 />
        <OnboardingComponent4 />
        <OnboardingComponent5 />
        <OnboardingComponent6 />
        <OnboardingComponent7 />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: {},
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    width: windowWidth,
  },
  headerItems: {
    width: '33%',
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
});
