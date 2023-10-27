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
import StartTikklingScreen from 'src/presentationLayer/view/screens/tikklingScreens/StartTikklingScreen';
import NotificationScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationScreen';
import NotificationSettingScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationSettingScreen';
import SearchAddressScreen from 'src/presentationLayer/view/screens/notUseScreens/SearchAddressScreen';
import WishlistManagementScreen from 'src/presentationLayer/view/screens/notUseScreens/WishlistManagementScreen';
import PaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleScreen';
import PaymentSuccessScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleSuccessScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLOR_WHITE} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {Easing, Linking, Platform} from 'react-native';
import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';
import ProductDetailScreen from 'src/presentationLayer/view/screens/productScreens/ProductDetailScreen';
import {ProductDetailViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductDetailState';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';
import {NotificationViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationState';
import {MainViewStateProvider} from 'src/presentationLayer/viewState/mainStates/MainState';
import {NotificationSettingViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationSettingState';
import HectoPaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/HectoPaymentScreen';

import TikklingDetailScreen from 'src/presentationLayer/view/screens/mainScreens/TikklingDetailScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CreateTikklingShareLink} from 'src/dataLayer/DataSource/Tikkling/CreateTikklingShareLink';

import {fcmService} from 'src/push_fcm';
import {localNotificationService} from 'src/push_noti';
import {useEffect, useState} from 'react';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

const ProductDetail = () => (
  <ProductDetailViewStateProvider>
    <ProductDetailScreen />
  </ProductDetailViewStateProvider>
);

const TikklingDetail = () => (
  <MainViewStateProvider>
    <TikklingDetailScreen />
  </MainViewStateProvider>
);

const StartTikkling = ({route}) => (
  <StartTikklingViewStateProvider>
    <StartTikklingScreen route={route} />
  </StartTikklingViewStateProvider>
);

const Notification = () => (
  <NotificationViewStateProvider>
    <NotificationScreen />
  </NotificationViewStateProvider>
);

const NotificationSetting = () => (
  <NotificationSettingViewStateProvider>
    <NotificationSettingScreen />
  </NotificationSettingViewStateProvider>
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
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          // cardStyleInterpolator: customCardStyleInterpolator,
          transitionSpec: customTransitionSpec,
        }}>
        <SignUpStack.Screen name="splash" component={SplashScreen} />
        <SignUpStack.Screen name="signup1" component={SignUpScreen1} />
        <SignUpStack.Screen name="signup2" component={SignUpScreen2} />
        <SignUpStack.Screen name="signup3" component={SignUpScreen3} />
        <SignUpStack.Screen name="signup4" component={SignUpScreen4} />
        <SignUpStack.Screen name="signup5" component={SignUpScreen5} />
        <SignUpStack.Screen name="signup6" component={SignUpScreen6} />
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
    SignUpNavigator: {screens: {splash: '/tikkling/:tikkling_id'}},
    main: '/main', // 매핑되는 URL 경로
    startTikkling: '/start-tikkling/:id/:name', // 매핑되는 URL 경로
    productDetail: '/product-detail', // 매핑되는 URL 경로
    notification: '/notification', // 매핑되는 URL 경로
    notificationSetting: '/notification-setting', // 매핑되는 URL 경로
    tikklingDetail: '/tikklingDetail', // 매핑되는 URL 경로
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
    const url = await Linking.getInitialURL();
    if (url != null) {
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
      topActions.showSnackbar(notify.message, 1);
    }
  };

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef} linking={linking}>
      <MainStack.Navigator
        initialRouteName="SignUpNavigator"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          cardStyleInterpolator: customCardStyleInterpolator,
          transitionSpec: customTransitionSpec,
        }}>
        {/*  <MainStack.Screen name="splash" component={SplashScreen} /> */}

        <MainStack.Screen name="SignUpNavigator" component={SignUpNavigator} />
        <MainStack.Screen
          name="main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
        />
        <MainStack.Screen name="startTikkling" component={StartTikkling} />
        <MainStack.Screen name="productDetail" component={ProductDetail} />
        <MainStack.Screen name="notification" component={Notification} />
        <MainStack.Screen name="tikklingDetail" component={TikklingDetail} />
        <MainStack.Screen
          name="notificationSetting"
          component={NotificationSetting}
        />
        <MainStack.Screen
          name="searchAddress"
          component={SearchAddressScreen}
          options={() => ({
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 200}},
              close: {animation: 'timing', config: {duration: 200}},
            },
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
        <MainStack.Screen
          name="wishlistManagement"
          component={WishlistManagementScreen}
        />
        <MainStack.Screen name="payment" component={PaymentScreen} />
        <MainStack.Screen name="hectoPayment" component={HectoPaymentScreen} />
        <MainStack.Screen
          name="paymentSuccess"
          component={PaymentSuccessScreen}
        />
        {/* <MainStack.Screen name="editProfile" component={EditProfileScreen} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
