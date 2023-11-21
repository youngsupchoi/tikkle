import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from './src/screens/1_SplashScreen/SplashScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './src/screens/3_MainScreens/HomeScreen';
// import SignUpNotUsedScreen from './src/screens/2_SignUpScreens/SignUpScreenNotUsed';
import SignUpScreen1 from './src/screens/2_SignUpScreens/SignUpScreen1';
import FindFriendsByContactsScreen from './src/screens/2_FindFriendsByContacts/FindFriendsByContactsScreen';
import SignUpScreen2 from './src/screens/2_SignUpScreens/SignUpScreen2';
import SignUpScreen3 from './src/screens/2_SignUpScreens/SignUpScreen3';
import SignUpScreen4 from './src/screens/2_SignUpScreens/SignUpScreen4';
import SignUpScreen5 from './src/screens/2_SignUpScreens/SignUpScreen5';
import SignUpScreen6 from './src/screens/2_SignUpScreens/SignUpScreen6';
import MyTikklingScreen from './src/screens/3_MainScreens/MyTikklingScreens/MyTikklingScreen';
import WishlistManagementScreen from './src/screens/3_MainScreens/WishlistManagementScreens/WishlistManagementScreen';
import PresentHistoryScreen from './src/screens/3_MainScreens/PresentHistoryScreens/PresentHistoryScreen';
import ProductSearchLandingScreen from './src/screens/3_MainScreens/ProductSearchScreens/ProductSearchLandingScreen';
import FriendsManagementScreen from './src/screens/3_MainScreens/FriendsManagementScreens/FriendsManagementScreen';
import SettingScreen from './src/screens/3_MainScreens/SettingScreens/SettingScreen';
import ProfileScreen from './src/screens/3_MainScreens/ProfileScreens/ProfileScreen';
import NotificationScreen from './src/screens/3_MainScreens/NotificationScreens/NotificationScreen';
import NotificationSettingScreen from './src/screens/3_MainScreens/NotificationScreens/NotificationSettingScreen';
import FriendsTikklingScreen from './src/screens/3_MainScreens/FriendsTikklingScreens/FriendsTikklingScreen';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from './src/components/Global/Colors/Colors';
import {
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Home2 from './src/assets/icons/Home2';
import Heart from './src/assets/icons/Heart';
import Receipt1 from './src/assets/icons/Receipt1';
import SearchFavorite1 from './src/assets/icons/SearchFavorite1';
import Profile2User from './src/assets/icons/Profile2User';
import Setting2 from './src/assets/icons/Setting2';
import {windowWidth} from './src/components/Global/Containers/MainContainer';
import {SPACING_2} from './src/components/Global/Spacing/BaseSpacing';
import {
  B,
  B22,
  B28,
  B34,
  M,
} from './src/components/Global/Typography/Typography';
import ProductSearchDetailScreen1 from './src/screens/3_MainScreens/ProductSearchScreens/ProductSearchDetailScreen1';
import StartTikklingScreen from './src/screens/3_MainScreens/StartTikklingScreens/StartTikklingScreen';
import Profile from './src/assets/icons/Profile';
import Bubble from './src/assets/icons/Bubble';
import SearchAddressScreen from './src/screens/3_MainScreens/StartTikklingScreens/SearchAddressScreen';
// import {BlurView} from '@react-native-community/blur';
import PaymentScreen from './src/screens/3_MainScreens/PaymentScreens/PaymentScreen';
import PaymentSuccessScreen from './src/screens/3_MainScreens/PaymentSuccessScreens/PaymentSuccessScreen';
import {MainViewStateProvider} from './src/viewState/mainStates/MainState';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
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

export default function MyStack() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          // cardStyleInterpolator: customCardStyleInterpolator, // apply the custom card style interpolator
          // transitionSpec: customTransitionSpec, // use the previously defined custom transition spec
        }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        {/* <Stack.Screen name="signupNotUsed" component={SignUpNotUsedScreen} /> */}
        <Stack.Screen name="signup1" component={SignUpScreen1} />
        <Stack.Screen name="signup2" component={SignUpScreen2} />
        <Stack.Screen name="signup3" component={SignUpScreen3} />
        <Stack.Screen name="signup4" component={SignUpScreen4} />
        <Stack.Screen name="signup5" component={SignUpScreen5} />
        <Stack.Screen name="signup6" component={SignUpScreen6} />
        <Stack.Screen
          name="main"
          component={MyBottomTab}
          options={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: false,
            // cardStyleInterpolator:
            //   CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
        />
        <Stack.Screen name="startTikkling" component={StartTikklingScreen} />
        <Stack.Screen
          name="productSearchDetail1"
          component={ProductSearchDetailScreen1}
        />
        <Stack.Screen name="notification" component={NotificationScreen} />
        <Stack.Screen
          name="notificationSetting"
          component={NotificationSettingScreen}
        />
        <Stack.Screen
          name="findFriendsByContacts"
          component={FindFriendsByContactsScreen}
        />
        <Stack.Screen
          name="myTikkling"
          component={MyTikklingScreen}
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
        />
        <Stack.Screen
          name="friendsTikkling"
          component={FriendsTikklingScreen}
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
        />
        <Stack.Screen
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
        />
        <Stack.Screen
          name="wishlistManagement"
          component={WishlistManagementScreen}
        />
        <Stack.Screen name="payment" component={PaymentScreen} />
        <Stack.Screen name="paymentSuccess" component={PaymentSuccessScreen} />
        {/* <Stack.Screen name="main" component={MyBottomTab} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView contentContainerStyle={{}} {...props}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('profile')}
        style={styles.userInfoSection}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={styles.userImage}
        />
      </TouchableOpacity>
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="홈"
        onPress={() => props.navigation.navigate('home')}
        icon={() => (
          <Home2
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
          />
        )}
      />
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="둘러보기"
        onPress={() => props.navigation.navigate('search')}
        icon={() => (
          <SearchFavorite1
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.7}
            scale={0.9}
          />
        )}
      />
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="위시리스트 관리"
        onPress={() => props.navigation.navigate('wishlistManagement')}
        icon={() => (
          <Heart
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.7}
            scale={0.9}
          />
        )}
      />
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="친구 관리"
        onPress={() => props.navigation.navigate('friends')}
        icon={() => (
          <Profile2User
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.7}
            scale={0.9}
          />
        )}
      />
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="받은 선물 내역"
        onPress={() => props.navigation.navigate('history')}
        icon={() => (
          <Receipt1
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.7}
            scale={0.9}
          />
        )}
      />
      <DrawerItem
        style={{}}
        labelStyle={{
          marginLeft: -16,
          fontFamily: M,
          fontSize: 13,
          color: COLOR_BLACK,
        }}
        label="설정"
        onPress={() => props.navigation.navigate('setting')}
        icon={() => (
          <Setting2
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.7}
            scale={0.9}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerStyle: {
          backgroundColor: backgroundColor,
          width: windowWidth * 0.6,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="profile" component={ProfileScreen} />
      {/* <Drawer.Screen
        name="wishlistManagement"
        component={WishlistManagementScreen}
      /> */}
      <Drawer.Screen name="history" component={PresentHistoryScreen} />
      <Drawer.Screen name="search" component={ProductSearchLandingScreen} />
      <Drawer.Screen name="friends" component={FriendsManagementScreen} />
      <Drawer.Screen name="setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

const MyBottomTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
          width: windowWidth,
          alignSelf: 'center',
          borderColor: COLOR_SEPARATOR,
          borderWidth: 2,
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontFamily: B,
        },
        tabBarActiveTintColor: COLOR_PRIMARY,
      }}>
      <BottomTab.Screen
        name="home"
        component={() => (
          <MainViewStateProvider>
            <HomeScreen />
          </MainViewStateProvider>
        )}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '홈',
          tabBarIcon: ({color, size}) => (
            <Home2 stroke={color} width={size} height={size} strokeWidth={2} />
          ),
        }}
      />
      <BottomTab.Screen
        name="search"
        component={ProductSearchLandingScreen}
        options={{
          tabBarLabel: '둘러보기',
          tabBarIcon: ({color, size}) => (
            <SearchFavorite1
              stroke={color}
              width={size}
              height={size}
              scale={0.85}
              strokeWidth={2}
            />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="wishlistManagement"
        component={WishlistManagementScreen}
        options={{
          tabBarItemStyle: {},
          tabBarLabel: '티클링',
          tabBarIcon: ({color, size}) => (
            <Bubble
              stroke={color}
              width={size}
              height={size}
              scale={0.9}
              strokeWidth={2}
            />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="friendsManagement"
        component={FriendsManagementScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '친구 관리',
          tabBarIcon: ({color, size}) => (
            <Profile2User
              stroke={color}
              width={size}
              height={size}
              scale={0.9}
              strokeWidth={2}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '프로필',
          tabBarIcon: ({color, size}) => (
            <Profile
              stroke={color}
              width={size}
              height={size}
              strokeWidth={2}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MyTopTab = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="splash" component={SplashScreen} />
    </TopTab.Navigator>
  );
};
