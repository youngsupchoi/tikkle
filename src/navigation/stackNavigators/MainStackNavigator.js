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
import {Easing, Linking} from 'react-native';
import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';
import ProductDetailScreen from 'src/presentationLayer/view/screens/productScreens/ProductDetailScreen';
import {ProductDetailViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductDetailState';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';
import {NotificationViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationState';
import {MainViewStateProvider} from 'src/presentationLayer/viewState/mainStates/MainState';
import {NotificationSettingViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationSettingState';
import HectoPaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/HectoPaymentScreen';

import TikklingDetailScreen from 'src/presentationLayer/view/screens/mainScreens/TikklingDetailScreen';

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
          cardStyleInterpolator: customCardStyleInterpolator,
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

const config = {
  screens: {
    SignUpNavigator: '/signup', // 매핑되는 URL 경로
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
  prefixes: ['https://...', 'http://localhost:3000', 'tikkle://'],

  async getInitialURL() {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    return null;
  },

  //받아준 딥링크 url을 subscribe에 넣어줘야 한다
  subscribe(listener) {
    console.log('linking subscribe to ', listener);
    const onReceiveURL = event => {
      const {url} = event;
      console.log('link has url', url, event);
      return listener(url);
    };

    Linking.addEventListener('url', onReceiveURL);
    return () => {
      console.log('linking unsubscribe to ', listener);
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
  config, //스텍 네비게이션 디렉토리 정보 설정 필요
};

//deep link code----------------------------------------------------------------------------------------------------------------

export default function MainStackNavigator() {
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
