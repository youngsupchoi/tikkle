import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  M15,
  M20,
  EB,
  M17,
  M11,
  B,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Image1 from 'src/assets/icons/undraw_wishlist_re_m7tv.svg';
import Image2 from 'src/assets/icons/undraw_online_wishes_dlmr.svg';
import ArrowRight from 'src/assets/icons/ArrowRight';

export default function SecondHero() {
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
    <View style={{marginTop: 8}}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onPageChange}
        ref={scrollViewRef}
        style={{paddingBottom: 8}}
        showsHorizontalScrollIndicator={false}>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              borderRadius: 16,
              backgroundColor: COLOR_SECONDARY,
              height: 120,
              width: windowWidth - 16,
              left: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <M11>특별한 선물하기, 티클에서</M11>
              <M17
                customStyle={{
                  color: COLOR_PRIMARY,
                  fontFamily: EB,
                  marginTop: 4,
                }}>
                여러분의 꿈은
              </M17>
              <M17 customStyle={{color: COLOR_PRIMARY, fontFamily: B}}>
                현실이 됩니다.
              </M17>
            </View>
          </View>
          <View style={{position: 'absolute', right: 80, top: 12}}>
            <Image2 width={100} height={100} />
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 120,
              width: windowWidth - 16,
              left: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <M11>기념일을 더욱 특별하게</M11>
              <M17 customStyle={{color: COLOR_PRIMARY, fontFamily: B}}>
                티클에서의 기념일은
              </M17>
              <M17 customStyle={{color: COLOR_PRIMARY, fontFamily: B}}>
                소원을 이루는 날이에요.
              </M17>
            </View>
          </View>
          <View style={{position: 'absolute', right: 75, top: 12}}>
            <Image1 width={100} height={100} />
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 120,
              width: windowWidth - 16,
              left: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <M11>올해 생일선물은 맥북, 좋다.</M11>
              <M17 customStyle={{color: COLOR_PRIMARY, fontFamily: B}}>
                진짜 선물은
              </M17>
              <M17 customStyle={{color: COLOR_PRIMARY, fontFamily: B}}>
                받는 사람도 만족해야죠.
              </M17>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 75,
              top: 12,
            }}>
            <Image
              source={require('src/assets/images/netbook-macbook-pro-laptop-apple-macbook-pro-d96bdc6be3804e7b771ba64838b7cdc0.png')}
              style={{width: 100, height: 100}}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 16,
              backgroundColor: COLOR_SECONDARY,
              opacity: 0.7,
              height: 120,
              width: windowWidth - 16,
              left: -40,
              paddingLeft: 56,
              paddingTop: 20,
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <M11>그래서, 어떻게 하는데?</M11>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  alignItems: 'center',
                }}>
                <M17
                  customStyle={{
                    color: COLOR_PRIMARY,
                    fontFamily: B,
                    marginRight: 8,
                  }}>
                  설명 바로가기
                </M17>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={COLOR_PRIMARY}
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
    bottom: 16,
    left: 24,
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
