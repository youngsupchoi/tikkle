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
import ProductSearchDetailScreen1 from 'src/presentationLayer/view/screens/productScreens/ProductDetailScreen';
import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';

const MainStack = createStackNavigator();
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

export default function MainStackNavigator() {
  function SignUpWrapper1() {
    return (
      <StartViewStateProvider>
        <SignUpScreen1 />
      </StartViewStateProvider>
    );
  }
  function SignUpWrapper2() {
    return (
      <StartViewStateProvider>
        <SignUpScreen2 />
      </StartViewStateProvider>
    );
  }
  return (
    <StartViewStateProvider>
      <NavigationContainer theme={MyTheme}>
        <MainStack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            cardStyleInterpolator: customCardStyleInterpolator, // apply the custom card style interpolator
            transitionSpec: customTransitionSpec, // use the previously defined custom transition spec
          }}>
          <MainStack.Screen name="splash" component={SplashScreen} />
          {/* <MainStack.Screen name="signupNotUsed" component={SignUpNotUsedScreen} /> */}
          <MainStack.Screen name="signup1" component={SignUpScreen1} />
          <MainStack.Screen name="signup2" component={SignUpScreen2} />
          <MainStack.Screen name="signup3" component={SignUpScreen3} />
          <MainStack.Screen name="signup4" component={SignUpScreen4} />
          <MainStack.Screen name="signup5" component={SignUpScreen5} />
          <MainStack.Screen name="signup6" component={SignUpScreen6} />
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
          <MainStack.Screen
            name="startTikkling"
            component={StartTikklingScreen}
          />
          <MainStack.Screen
            name="productSearchDetail1"
            component={ProductSearchDetailScreen1}
          />
          <MainStack.Screen
            name="notification"
            component={NotificationScreen}
          />
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
    </StartViewStateProvider>
  );
}
