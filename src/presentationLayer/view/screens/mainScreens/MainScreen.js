import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import HomeHeader from 'src/presentationLayer/view/components/globalComponents/Headers/HomeHeader';
import {
  COLOR_CHRISTMAS_RED_ONE,
  COLOR_CHRISTMAS_RED_TWO,
  COLOR_PRIMARY,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B12,
  B15,
  B20,
  CHRISTMAS_TILE24,
  CHRISTMAS_TILE32,
  EB,
  M11,
  M15,
  R,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {HomeLoader} from 'src/presentationLayer/view/components/globalComponents/Skeletons/Skeletons';
import {RefreshControl} from 'react-native-gesture-handler';
import SecondHero from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/SecondHero';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
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
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import {fcmService} from 'src/push_fcm';
import PushNotification from 'react-native-push-notification';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import WhoParticipated from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/WhoParticipated';
import ViewShot from 'react-native-view-shot';
import {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import CompleteTikklingBackground from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CompleteTikklingBackground';
import EventModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/EventModal';
import DeliveryCheck from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/DeliveryCheck';
import RefundCheck from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/RefundCheck';
import ViewShotComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/ViewShotComponent';
// Get the screen width

export default function HomeScreen({route}) {
  const {ref, state, actions} = useMainViewModel();
  const {topState, topActions} = useTopViewModel();
  const translateYSecondHero = useSharedValue(20);
  const translateYMyTikkling = useSharedValue(20);
  const translateYFriendsTikkling = useSharedValue(20);
  const translateYMyWishlist = useSharedValue(20);
  const translateYFriendsEvent = useSharedValue(20);

  //============================================================

  //============================================================

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

  useEffect(() => {
    if (topState.openDeepLink == false && topState.openApp == true) {
      topActions.setOpenApp(false);
      actions.open_event_modal(actions.setEventModalVisible);
    }
  }, []);

  useEffect(() => {
    PushNotification.popInitialNotification(notification => {
      if (notification) {
        const {link = null} = notification?.data || {};
        link && Linking.openURL(link); // <---- 2
      }
    });
    actions.setPaymentButtonPressed(false);
    actions.requestUserPermission();
    actions.findContacts();
  }, []);

  return (
    <View style={{backgroundColor: backgroundColor, flex: 1}}>
      <View
        style={{
          // position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}>
        {/* <CompleteTikklingBackground
          list_data={state.list_data}
          itemImage={state.myTikklingData.thumbnail_image}
        /> */}
      </View>
      {state.list_data && state.myTikklingData ? (
        <ViewShotComponent
          list_data={state.list_data}
          itemImage={state.myTikklingData.thumbnail_image}
        />
      ) : null}

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
          <GlobalLoader />
        ) : (
          <View>
            {state.deliveryCheckVisible ? <DeliveryCheck /> : null}
            {state.refundCheckVisible ? <RefundCheck /> : null}
            {/* {state.isTikkling ? null : (
                <Animated.View style={[animatedStyleSecondHero]}>
                  <SecondHero />
                </Animated.View>
              )} */}
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
        {/* <Footer /> */}
      </ScrollView>

      <WhoParticipated
        data={state.list_data}
        showModal={state.showWhoParticipatedModal}
        setShowModal={actions.setShowWhoParticipatedModal}
      />

      <EventModal
        visible={state.eventModalVisible}
        setVisible={actions.setEventModalVisible}
      />

      <PostCodeModal
        setShowPostCodeModal={actions.setShowPostCodeModal}
        showPostCodeModal={state.showPostCodeModal}
        setAddress={actions.setAddress}
        setZoneCode={actions.setZonecode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    width: windowWidth,
    // height: windowHeight + 300,
    backgroundColor: backgroundColor,
  },
  homeFooter: {
    height: 50,
  },
});
