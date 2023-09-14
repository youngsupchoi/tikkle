import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import HomeHeader from 'src/presentationLayer/view/components/globalComponents/Headers/HomeHeader';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {HomeLoader} from 'src/presentationLayer/view/components/globalComponents/Skeletons/Skeletons';
import {RefreshControl} from 'react-native-gesture-handler';
import SecondHero from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/SecondHero';

import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import MyTikklingComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/MyTikklingComponent';
import FriendsTikklingComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FriendsTikklingComponents/FriendsTikklingComponent';
import MyWishlistComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyWishlistComponents/MyWishlistComponent';
import FriendsEventComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FriendsEventComponents/FriendsEventComponent';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import LottieView from 'lottie-react-native';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';

export default function HomeScreen() {
  const {ref, state, actions} = useMainViewModel();
  const translateYSecondHero = useSharedValue(20);
  const translateYMyTikkling = useSharedValue(20);
  const translateYFriendsTikkling = useSharedValue(20);
  const translateYMyWishlist = useSharedValue(20);
  const translateYFriendsEvent = useSharedValue(20);

  const animatedStyleSecondHero = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYSecondHero.value}],
      opacity: interpolate(translateYSecondHero.value, [20, 0], [0, 1]),
    };
  });

  const animatedStyleMyTikkling = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYMyTikkling.value}],
      opacity: interpolate(translateYMyTikkling.value, [20, 0], [0, 1]),
    };
  });
  const animatedStyleFriendsTikkling = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYFriendsTikkling.value}],
      opacity: interpolate(translateYFriendsTikkling.value, [20, 0], [0, 1]),
    };
  });
  const animatedStyleMyWishlist = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYFriendsEvent.value}],
      opacity: interpolate(translateYFriendsEvent.value, [20, 0], [0, 1]),
    };
  });
  const animatedStyleFriendsEvent = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYFriendsEvent.value}],
      opacity: interpolate(translateYFriendsEvent.value, [20, 0], [0, 1]),
    };
  });
  const delay = 200; // 각 컴포넌트 사이의 시간 차이 (밀리초)

  useEffect(() => {
    actions.setLoading(true);
    actions.loadData();
    setTimeout(() => {
      translateYSecondHero.value = withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 1 * delay); // 첫 번째 컴포넌트
    setTimeout(() => {
      translateYMyTikkling.value = withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 2 * delay); // 두 번째 컴포넌트
    setTimeout(() => {
      translateYFriendsTikkling.value = withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 3 * delay); // 세 번째 컴포넌트
    setTimeout(() => {
      translateYMyWishlist.value = withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 4 * delay); // 네 번째 컴포넌트
    setTimeout(() => {
      translateYFriendsEvent.value = withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 5 * delay); // 다섯 번째 컴포넌트
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{}}>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={actions.onRefresh}
            />
          }
          style={styles.HomeContainer}>
          <HomeHeader
            isNotice={state.isNotice}
            tikkling_ticket={state.userData.tikkling_ticket}
          />
          {state.loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <LottieView
                pointerEvents="none"
                source={require('src/assets/animations/loading.json')} // replace with your Lottie file path
                autoPlay
                style={{
                  width: 120,
                  height: 120,
                }}
              />
              {/* <HomeLoader width={windowWidth} height={windowHeight}></HomeLoader> */}
            </View>
          ) : (
            <View>
              {state.isTikkling ? null : (
                <Animated.View style={[animatedStyleSecondHero]}>
                  <SecondHero />
                </Animated.View>
              )}
              {state.isTikkling ? (
                <Animated.View style={[animatedStyleMyTikkling]}>
                  <MyTikklingComponent />
                </Animated.View>
              ) : null}
              {state.friendTikklingData.length === 0 ? null : (
                <Animated.View style={[animatedStyleFriendsTikkling]}>
                  <FriendsTikklingComponent />
                </Animated.View>
              )}
              <Animated.View style={[animatedStyleMyWishlist]}>
                <MyWishlistComponent />
              </Animated.View>
              {state.friendEventData.length === 0 ? null : (
                <Animated.View style={[animatedStyleFriendsEvent]}>
                  <FriendsEventComponent />
                </Animated.View>
              )}
            </View>
          )}
          <View style={styles.homeFooter}></View>
          <Footer />
        </ScrollView>
        <PostCodeModal
          setShowPostCodeModal={actions.setShowPostCodeModal}
          showPostCodeModal={state.showPostCodeModal}
          setAddress={actions.setAddress}
          setZoneCode={actions.setZonecode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    width: windowWidth,
    backgroundColor: backgroundColor,
  },
  homeFooter: {
    height: 50,
  },
});
