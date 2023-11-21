import {View, ScrollView, StyleSheet, Animated, Easing} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  B15,
  M20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowRight from 'src/assets/icons/ArrowRight';

export default function ThirdHero() {
  const [activePage, setActivePage] = useState(0);
  const scrollViewRef = useRef();
  const totalPages = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextPage = activePage + 1;

      if (nextPage >= totalPages) {
        nextPage = 0; // Loop back to the first page
      }

      scrollViewRef.current.scrollTo({
        x: nextPage * windowWidth,
        animated: true,
        duration: 800, // Adjusted duration
        easing: Easing.out(Easing.cubic), // Adjusted easing
      });

      setActivePage(nextPage);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [activePage]);

  const onPageChange = event => {
    const {contentOffset} = event.nativeEvent;
    let pageNum = Math.round(contentOffset.x / windowWidth);
    setActivePage(pageNum);
  };

  return (
    <View style={{marginTop: 40}}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onPageChange}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              // elevation: 3,
              backgroundColor: COLOR_SECONDARY,
              // opacity: 0.7,
              height: 300,
              width: windowWidth - 16,
              right: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <B15>특별한 선물하기, 티클에서</B15>
              <M20 customStyle={{color: COLOR_WHITE}}>여러분의 꿈은</M20>
              <M20 customStyle={{color: COLOR_WHITE}}>현실이 됩니다.</M20>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              // elevation: 3,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 300,
              width: windowWidth - 16,
              right: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <B15>기념일을 더욱 특별하게</B15>
              <M20 customStyle={{color: COLOR_WHITE}}>티클에서의 기념일은</M20>
              <M20 customStyle={{color: COLOR_WHITE}}>
                소원을 이루는 날이에요.
              </M20>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              // elevation: 3,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 300,
              width: windowWidth - 16,
              right: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <B15>올해 생일선물은 맥북, 좋다.</B15>
              <M20 customStyle={{color: COLOR_WHITE}}>진짜 선물은</M20>
              <M20 customStyle={{color: COLOR_WHITE}}>
                받는 사람도 만족해야죠.
              </M20>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              // elevation: 3,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 300,
              width: windowWidth - 16,
              right: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <B15>그래서, 어떻게 하는데?</B15>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  alignItems: 'center',
                }}>
                <M20 customStyle={{color: COLOR_WHITE, marginRight: 8}}>
                  설명 바로가기
                </M20>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={COLOR_WHITE}
                  strokeWidth={2}
                  scale={1}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.pagination}>
        {Array.from({length: totalPages}).map((_, i) => (
          <AnimatedButton
            key={i}
            onPress={() => {
              Animated.timing(scrollX, {
                toValue: i * windowWidth,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: false,
              }).start();
              setActivePage(i);
            }}>
            <View
              style={[styles.dot, activePage === i ? styles.activeDot : {}]}
            />
          </AnimatedButton>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    right: 24,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'rgba(0,0,0,0.7)', // Or whatever color you'd like for the active dot
  },
});
