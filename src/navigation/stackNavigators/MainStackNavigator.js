// mainStack.js
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BottomTabNavigator from 'src/navigation/tabNavigators/BottomTabNavigator';
import SplashScreen from 'src/presentationLayer/view/screens/startScreens/SplashScreen';
import SignUpScreen1 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/PhoneInputScreen';
import SignUpScreen2 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/PhoneCheckScreen';
import SignUpScreen3 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/NameInputScreen';
import SignUpScreen4 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/GenderInputScreen';
import SignUpScreen5 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/BirthDayInputScreen';
import SignUpScreen6 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/IdInputScreen';
import Onboarding from 'src/presentationLayer/view/screens/startScreens/AuthScreens/Onboarding';
import StartTikklingScreen from 'src/presentationLayer/view/screens/tikklingScreens/StartTikklingScreen';
import NotificationScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationScreen';
import NotificationSettingScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationSettingScreen';
import SearchAddressScreen from 'src/presentationLayer/view/screens/notUseScreens/SearchAddressScreen';
import WishlistManagementScreen from 'src/presentationLayer/view/screens/notUseScreens/WishlistManagementScreen';
import PaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleScreen';
import PaymentSuccessScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleSuccessScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {Easing, Linking, Platform, SafeAreaView} from 'react-native';
import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';
import ProductDetailScreen from 'src/presentationLayer/view/screens/productScreens/ProductDetailScreen';
import ProductInqireScreen from 'src/presentationLayer/view/screens/productScreens/ProductInqireScreen';
import {ProductDetailViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductDetailState';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';
import {NotificationViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationState';
import {MainViewStateProvider} from 'src/presentationLayer/viewState/mainStates/MainState';
import {NotificationSettingViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationSettingState';
import HectoPaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/HectoPaymentScreen';
import {Safe} from 'src/presentationLayer/view/components/globalComponents/Containers/Safe';
import TikklingDetailScreen from 'src/presentationLayer/view/screens/mainScreens/TikklingDetailScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CreateTikklingShareLink} from 'src/dataLayer/DataSource/Tikkling/CreateTikklingShareLink';
import {ProductMainViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductMainState';
import {fcmService} from 'src/push_fcm';
import {localNotificationService} from 'src/push_noti';
import {useEffect, useState} from 'react';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import PushNotification from 'react-native-push-notification';
import {M} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import SignUpScreen0 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/SignUpScreen0';

const ProductDetail = () => (
  <Safe color={COLOR_WHITE}>
    <ProductDetailViewStateProvider>
      <ProductDetailScreen />
    </ProductDetailViewStateProvider>
  </Safe>
);

const ProductInqire = () => (
  <Safe>
    <ProductMainViewStateProvider>
      <ProductInqireScreen />
    </ProductMainViewStateProvider>
  </Safe>
);

const TikklingDetail = () => (
  <Safe>
    <MainViewStateProvider>
      <TikklingDetailScreen />
    </MainViewStateProvider>
  </Safe>
);

const StartTikkling = ({route}) => (
  <Safe color={COLOR_WHITE}>
    <StartTikklingViewStateProvider>
      <StartTikklingScreen route={route} />
    </StartTikklingViewStateProvider>
  </Safe>
);

const Onboarding_ = () => (
  <Safe>
    <MainViewStateProvider>
      <Onboarding />
    </MainViewStateProvider>
  </Safe>
);

const Notification = () => (
  <Safe>
    <NotificationViewStateProvider>
      <NotificationScreen />
    </NotificationViewStateProvider>
  </Safe>
);

const NotificationSetting = () => (
  <Safe>
    <NotificationSettingViewStateProvider>
      <NotificationSettingScreen />
    </NotificationSettingViewStateProvider>
  </Safe>
);

const SignUp0 = () => (
  <Safe color={COLOR_WHITE}>
    <SignUpScreen0 />
  </Safe>
);

const SignUp1 = () => (
  <Safe>
    <SignUpScreen1 />
  </Safe>
);

const SignUp2 = () => (
  <Safe>
    <SignUpScreen2 />
  </Safe>
);

const SignUp3 = () => (
  <Safe>
    <SignUpScreen3 />
  </Safe>
);

const SignUp4 = () => (
  <Safe>
    <SignUpScreen4 />
  </Safe>
);

const SignUp5 = () => (
  <Safe>
    <SignUpScreen5 />
  </Safe>
);

const MainStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLOR_WHITE,
  },
};

const customTransitionSpec = {
  open: {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    },
  },
  close: {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    },
  },
};

// Define a custom card style interpolator
const customCardStyleInterpolator = ({current, next, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0], // transition from right to left
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  };
};
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(routes) {
  navigationRef.current?.reset(routes);
}

function SignUpNavigator() {
  return (
    <StartViewStateProvider>
      <SignUpStack.Navigator
        initialRouteName="onboarding"
        screenOptions={{
          headerShown: false,
          // gestureEnabled: true,
          // cardOverlayEnabled: true,
          cardStyleInterpolator: customCardStyleInterpolator,
          // transitionSpec: customTransitionSpec,
        }}>
        <SignUpStack.Screen name="signup0" component={SignUp0} />
        <SignUpStack.Screen name="signup1" component={SignUp1} />
        <SignUpStack.Screen name="signup2" component={SignUp2} />
        <SignUpStack.Screen name="signup3" component={SignUp3} />
        <SignUpStack.Screen name="signup4" component={SignUp4} />
        <SignUpStack.Screen name="signup5" component={SignUp5} />
        {/* <SignUpStack.Screen name="signup6" component={SignUpScreen6} /> */}
      </SignUpStack.Navigator>
    </StartViewStateProvider>
  );
}

//deep link code----------------------------------------------------------------------------------------------------------------

const resolveDynamicLink = async shortLink => {
  try {
    const linkData = await dynamicLinks().resolveLink(shortLink);
    const originalLink = linkData.url; // 원래의 link 파라미터
    console.log('Original link:', originalLink);
    return originalLink;
  } catch (error) {
    console.error('Error resolving dynamic link', error);
    return null;
  }
};

const config = {
  screens: {
    splash: '/tikkling/:tikkling_id',
    // SignUpNavigator: {screens: {splash: '/tikkling/:tikkling_id'}},
    main: '/main', // 매핑되는 URL 경로
    startTikkling: '/start-tikkling/:id/:name', // 매핑되는 URL 경로
    productDetail: '/product-detail', // 매핑되는 URL 경로
    ProductInqire: '/product-inqire',
    notification: '/notification', // 매핑되는 URL 경로
    notificationSetting: '/notification-setting', // 매핑되는 URL 경로
    tikklingDetail: '/tikklingDetail/:tikkling_id', // 매핑되는 URL 경로
    searchAddress: '/search-address', // 매핑되는 URL 경로
    wishlistManagement: '/wishlist-management', // 매핑되는 URL 경로
    payment: '/payment', // 매핑되는 URL 경로
    hectoPayment: '/hecto-payment', // 매핑되는 URL 경로
    paymentSuccess: '/payment-success', // 매핑되는 URL 경로
  },
};

const linking = {
  //디폴트 프로토콜 설정 필요
  prefixes: [
    // 'https://tikkle.lifoli.co.kr',
    'http://localhost:3000',
    'tikkle://',
  ],

  async getInitialURL() {
    const {topState, topActions} = useTopViewModel();
    const url = await Linking.getInitialURL();
    if (url != null) {
      // console.log('##############\n################');

      topActions.setOpenDeepLink(true);

      if (url.startsWith('https://tikkle.lifoli.co.kr')) {
        const originalLink = await resolveDynamicLink(url);
        return originalLink;
      } else if (url.startsWith('tikkle://')) {
        return url;
      }
    }
    return null;
  },

  //받아준 딥링크 url을 subscribe에 넣어줘야 한다
  subscribe(listener) {
    const onReceiveURL = async event => {
      const {url} = event;
      if (url.startsWith('https://tikkle.lifoli.co.kr')) {
        const originalLink = await resolveDynamicLink(url);
        listener(originalLink);
      } else {
        listener(url);
      }
    };

    Linking.addEventListener('url', onReceiveURL);
    return () => {
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
  config, //스텍 네비게이션 디렉토리 정보 설정 필요
};

//deep link code----------------------------------------------------------------------------------------------------------------

export default function MainStackNavigator() {
  const {topActions} = useTopViewModel();

  //--notification code---------------------
  useEffect(() => {
    // const {link = null} = notification?.data || {}; // <---- 1
    // PushNotification.popInitialNotification(notification => {
    //   if (notification) {
    //     const {link = null} = notification?.data || {};
    //     Linking.openURL(link); // <---- 2
    //   }
    // });
    fcmService.registerAppWithFCM(); //ios일때 자동으로 가져오도록 하는 코드
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  // const [token, setToken] = useState('');

  const onRegister = tk => {
    //토큰 가져온걸로 뭐할지
    // const temp = tk.substring(0, 10);
    // setToken(temp);
    // console.log('[App] onRegister : token :', temp);
    //console.log('[App] onRegister : token :', tk);
  };

  const onNotification = notify => {
    console.log('[onNotification] notify 알림 왔을 때 :', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };

    if (Platform.OS === 'ios') {
      topActions.showSnackbar(notify.body, 1);
    }

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  const onOpenNotification = notify => {
    //앱 켜진 상태에서 알림 받았을 때 하는 일
    console.log('[App] onOpenNotification 앱 켜진 상태에서 : notify :', notify);
    // Alert.alert('Open Notification : notify.body :' + notify.body);
    if (Platform.OS === 'ios') {
      topActions.showSnackbar(notify.body, 1);
    } else {
      if (notify.message) {
        topActions.showSnackbar(notify.message, 1);
      }
    }
  };

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef} linking={linking}>
      <MainStack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          // gestureEnabled: true,
          // cardOverlayEnabled: true,
          cardStyleInterpolator: customCardStyleInterpolator,
          // transitionSpec: customTransitionSpec,
        }}>
        <MainStack.Screen name="splash" component={SplashScreen} />

        <MainStack.Screen name="SignUpNavigator" component={SignUpNavigator} />
        <MainStack.Screen
          name="main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: false,
            // cardStyleInterpolator:
            //   CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
        />
        <MainStack.Screen name="startTikkling" component={StartTikkling} />
        <MainStack.Screen name="productDetail" component={ProductDetail} />
        <MainStack.Screen name="ProductInqire" component={ProductInqire} />
        <MainStack.Screen name="notification" component={Notification} />
        <MainStack.Screen name="tikklingDetail" component={TikklingDetail} />
        <SignUpStack.Screen name="onboarding" component={Onboarding_} />
        <MainStack.Screen
          name="notificationSetting"
          component={NotificationSetting}
        />
        {/* <MainStack.Screen
          name="searchAddress"
          component={SearchAddressScreen}
          options={() => ({
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 200}},
              close: {animation: 'timing', config: {duration: 200}},
            },
            // cardStyleInterpolator: ({current: {progress}}) => {
            //   return {
            //     cardStyle: {
            //       opacity: progress,
            //     },
            //   };
            // },
          })}
        /> */}
        {/* <MainStack.Screen
          name="wishlistManagement"
          component={WishlistManagementScreen}
        /> */}
        {/* <MainStack.Screen name="payment" component={PaymentScreen} /> */}
        <MainStack.Screen name="hectoPayment" component={HectoPaymentScreen} />
        {/* <MainStack.Screen
          name="paymentSuccess"
          component={PaymentSuccessScreen}
        /> */}
        {/* <MainStack.Screen name="editProfile" component={EditProfileScreen} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
