// mainStack.js
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from 'src/presentationLayer/view/screens/startScreens/SplashScreen';
import SignUpScreen1 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/PhoneInputScreen';
import SignUpScreen2 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/PhoneCheckScreen';
import SignUpScreen3 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/NameInputScreen';
import SignUpScreen4 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/GenderInputScreen';
import SignUpScreen5 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/BirthDayInputScreen';
import SignUpScreen6 from 'src/presentationLayer/view/screens/startScreens/AuthScreens/IdInput';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLOR_WHITE} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {Easing} from 'react-native';
import {StartViewStateProvider} from 'src/presentationLayer/viewState/startStates/AuthState';
import Start from 'src/assets/icons/Start';

const AuthStack = createStackNavigator();
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

export default function AuthStackNavigator({isLogin}) {
  return (
    <StartViewStateProvider>
      <NavigationContainer theme={MyTheme}>
        <AuthStack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            cardStyleInterpolator: customCardStyleInterpolator, // apply the custom card style interpolator
            transitionSpec: customTransitionSpec, // use the previously defined custom transition spec
          }}>
          <AuthStack.Screen name="splash" component={SplashScreen} />
          {/* <MainStack.Screen name="signupNotUsed" component={SignUpNotUsedScreen} /> */}
          <AuthStack.Screen name="signup1" component={SignUpScreen1} />
          <AuthStack.Screen name="signup2" component={SignUpScreen2} />
          <AuthStack.Screen name="signup3" component={SignUpScreen3} />
          <AuthStack.Screen name="signup4" component={SignUpScreen4} />
          <AuthStack.Screen name="signup5" component={SignUpScreen5} />
          <AuthStack.Screen name="signup6" component={SignUpScreen6} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </StartViewStateProvider>
  );
}
