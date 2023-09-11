// mainStack.js
import React, {useRef} from 'react';
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
import SignUpScreen6 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/IdInput';
import StartTikklingScreen from 'src/presentationLayer/view/screens/tikklingScreens/StartTikklingScreen';
import NotificationScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationScreen';
import NotificationSettingScreen from 'src/presentationLayer/view/screens/mainScreens/NotificationScreens/NotificationSettingScreen';
import MyTikklingScreen from 'src/presentationLayer/view/screens/notUseScreens/TikklingDetailScreen';
import FriendsTikklingScreen from 'src/presentationLayer/view/screens/notUseScreens/FriendsTikklingDetailScreen';
import SearchAddressScreen from 'src/presentationLayer/view/screens/notUseScreens/SearchAddressScreen';
import WishlistManagementScreen from 'src/presentationLayer/view/screens/notUseScreens/WishlistManagementScreen';
import PaymentScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleScreen';
import PaymentSuccessScreen from 'src/presentationLayer/view/screens/tikklingScreens/SendTikkleSuccessScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLOR_WHITE} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {Easing} from 'react-native';

import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';
import ProductDetailScreen from 'src/presentationLayer/view/screens/productScreens/ProductDetailScreen';
import {ProductDetailViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductDetailState';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';
import {NotificationViewStateProvider} from 'src/presentationLayer/viewState/mainStates/NotificationState';

const ProductDetail = () => (
  <ProductDetailViewStateProvider>
    <ProductDetailScreen />
  </ProductDetailViewStateProvider>
);

const StartTikkling = () => (
  <StartTikklingViewStateProvider>
    <StartTikklingScreen />
  </StartTikklingViewStateProvider>
);

const Notification = () => (
  <NotificationViewStateProvider>
    <NotificationScreen />
  </NotificationViewStateProvider>
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

export default function MainStackNavigator() {
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
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
        <MainStack.Screen
          name="notificationSetting"
          component={NotificationSettingScreen}
        />
        {/* <MainStack.Screen
          name="findFriendsByContacts"
          component={FindFriendsByContactsScreen}
        /> */}
        {/* <MainStack.Screen
          name="myTikkling"
          component={MyTikklingScreen}
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
        /> */}
        {/* <MainStack.Screen
          name="friendsTikkling"
          component={FriendsTikklingScreen}
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
        /> */}
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
        <MainStack.Screen
          name="paymentSuccess"
          component={PaymentSuccessScreen}
        />
        {/* <MainStack.Screen name="main" component={MyBottomTab} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
