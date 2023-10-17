import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {View} from 'react-native';
import Home2 from 'src/assets/icons/Home2';
import Home2Filled from 'src/assets/icons/Home2Filled';
import Profile from 'src/assets/icons/Profile';
import Profile2User from 'src/assets/icons/Profile2User';
import Profile2UserFilled from 'src/assets/icons/Profile2UserFilled';
import ProfileFilled from 'src/assets/icons/ProfileFilled';
import SearchFavorite1 from 'src/assets/icons/SearchFavorite1';
import SearchFavorite1Filled from 'src/assets/icons/SearchFavorite1Filled';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import FriendsManagementScreen from 'src/presentationLayer/view/screens/friendScreens/FriendsMainScreen';
import HomeScreen from 'src/presentationLayer/view/screens/mainScreens/MainScreen';
import ProfileScreen from 'src/presentationLayer/view/screens/myPageScreens/MyPageScreen';
import CustomerCenterScreen from 'src/presentationLayer/view/screens/myPageScreens/CustomerCenterScreen';
import ProductSearchLandingScreen from 'src/presentationLayer/view/screens/productScreens/ProductMainScreen';
import {FriendMainViewStateProvider} from 'src/presentationLayer/viewState/friendStates/FriendsMainState';
import {MainViewStateProvider} from 'src/presentationLayer/viewState/mainStates/MainState';
import {MyPageViewStateProvider} from 'src/presentationLayer/viewState/myPageStates/MyPageState';
import {ProductMainViewStateProvider} from 'src/presentationLayer/viewState/productStates/ProductMainState';
import SendTikkleScreen from 'src/presentationLayer/view/screens/myPageScreens/SentTikkleScreen';
import InquireScreen from 'src/presentationLayer/view/screens/myPageScreens/InquireScreen';
import SentTikkleDetailScreen from 'src/presentationLayer/view/screens/myPageScreens/SentTikkleDetailScreen';
import EditProfileScreen from 'src/presentationLayer/view/screens/myPageScreens/EditProfileScreen';
import HistoryDetailScreen from 'src/presentationLayer/view/screens/myPageScreens/HistoryDetailScreen';

const BottomTab = createBottomTabNavigator();
const Home = () => (
  <MainViewStateProvider>
    <HomeScreen />
  </MainViewStateProvider>
);
const Search = () => (
  <ProductMainViewStateProvider>
    <ProductSearchLandingScreen />
  </ProductMainViewStateProvider>
);
const FriendsManagement = () => (
  <FriendMainViewStateProvider>
    <FriendsManagementScreen />
  </FriendMainViewStateProvider>
);
const MyPage = () => (
  // <MyPageViewStateProvider>
  <ProfileScreen />
  // </MyPageViewStateProvider>
);
const MyPageStack = createStackNavigator();

function MyPageNavigator() {
  return (
    <MyPageViewStateProvider>
      <MyPageStack.Navigator
        initialRouteName="MyPage"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <MyPageStack.Screen name="MyPage" component={MyPage} />
        <MyPageStack.Screen name="SendTikkle" component={SendTikkleScreen} />
        <MyPageStack.Screen
          name="CustomerCenter"
          component={CustomerCenterScreen}
        />
        <MyPageStack.Screen
          name="HistoryDetail"
          component={HistoryDetailScreen}
        />
        <MyPageStack.Screen name="Inquire" component={InquireScreen} />
        <MyPageStack.Screen
          name="SentTikkleDetail"
          component={SentTikkleDetailScreen}
        />
        <MyPageStack.Screen name="editProfile" component={EditProfileScreen} />
      </MyPageStack.Navigator>
    </MyPageViewStateProvider>
  );
}

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 40,
          backgroundColor: backgroundColor,
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontFamily: B,
        },
        tabBarActiveTintColor: COLOR_PRIMARY,
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '홈',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: 'backgroundColor',
                  margin: 0,
                }}>
                <Home2Filled fill={color} width={size} height={size} />
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <Home2
                  stroke={color}
                  width={size}
                  height={size}
                  strokeWidth={2}
                />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name="search"
        component={Search}
        options={{
          tabBarLabel: '둘러보기',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <SearchFavorite1Filled
                  fill={color}
                  width={size}
                  height={size}
                />
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <SearchFavorite1
                  stroke={color}
                  width={size}
                  height={size}
                  scale={0.85}
                  strokeWidth={2}
                />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name="friendsManagement"
        // component={FriendsManagementScreen}
        component={FriendsManagement}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '친구 관리',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <Profile2UserFilled fill={color} width={size} height={size} />
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <Profile2User
                  stroke={color}
                  width={size}
                  height={size}
                  scale={0.85}
                  strokeWidth={2}
                />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={MyPageNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '프로필',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <ProfileFilled fill={color} width={size} height={size} />
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  backgroundColor: backgroundColor,
                  margin: 0,
                }}>
                <Profile
                  stroke={color}
                  width={size}
                  height={size}
                  strokeWidth={2}
                />
              </View>
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}
