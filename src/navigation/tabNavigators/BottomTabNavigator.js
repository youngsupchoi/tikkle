import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import Home2 from 'src/assets/icons/Home2';
import Home2Filled from 'src/assets/icons/Home2Filled';
import Profile from 'src/assets/icons/Profile';
import Profile2User from 'src/assets/icons/Profile2User';
import Profile2UserFilled from 'src/assets/icons/Profile2UserFilled';
import ProfileFilled from 'src/assets/icons/ProfileFilled';
import SearchFavorite1 from 'src/assets/icons/SearchFavorite1';
import SearchFavorite1Filled from 'src/assets/icons/SearchFavorite1Filled';
import {
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
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
  <MyPageViewStateProvider>
    <ProfileScreen />
  </MyPageViewStateProvider>
);
const MyPageStack = createStackNavigator();

function MyPageNavigator() {
  return (
    <MyPageViewStateProvider>
      <MyPageStack.Navigator
        initialRouteName="MyPage"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <MyPageStack.Screen name="MyPage" component={MyPage} />
        <MyPageStack.Screen name="SendTikkle" component={SendTikkleScreen} />
        <MyPageStack.Screen
          name="CustomerCenter"
          component={CustomerCenterScreen}
        />
        <MyPageStack.Screen name="Inquire" component={InquireScreen} />
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
          backgroundColor: backgroundColor, // Semi-transparent background
          width: windowWidth,
          alignSelf: 'center',
          borderColor: COLOR_SEPARATOR,
          borderWidth: 2,
          height: 50,
          width: '80%',
          position: 'absolute',
          left: '10%',
          right: '10%',
          borderRadius: 100,
          bottom: 16,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {
            // iOS용 그림자 위치
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2, // iOS용 그림자 투명도
          shadowRadius: 3, // iOS용 그림자 반경
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
              <Home2Filled fill={color} width={size} height={size} />
            ) : (
              <Home2
                stroke={color}
                width={size}
                height={size}
                strokeWidth={2}
              />
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
              <SearchFavorite1Filled fill={color} width={size} height={size} />
            ) : (
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
      <BottomTab.Screen
        name="friendsManagement"
        // component={FriendsManagementScreen}
        component={FriendsManagement}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '친구 관리',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Profile2UserFilled fill={color} width={size} height={size} />
            ) : (
              <Profile2User
                stroke={color}
                width={size}
                height={size}
                scale={0.85}
                strokeWidth={2}
              />
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
              <ProfileFilled fill={color} width={size} height={size} />
            ) : (
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
}
