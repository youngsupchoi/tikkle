import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home2 from 'src/assets/icons/Home2';
import Profile from 'src/assets/icons/Profile';
import Profile2User from 'src/assets/icons/Profile2User';
import SearchFavorite1 from 'src/assets/icons/SearchFavorite1';
import {
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import FriendsManagementScreen from 'src/presentationLayer/view/screens/friendScreens/FriendsMainScreen';
import HomeScreen from 'src/presentationLayer/view/screens/mainScreens/MainScreen';
import ProfileScreen from 'src/presentationLayer/view/screens/myPageScreens/MyPageScreen';
import ProductSearchLandingScreen from 'src/presentationLayer/view/screens/productScreens/ProductMainScreen';
import {MainViewStateProvider} from 'src/presentationLayer/viewState/mainStates/MainState';

const BottomTab = createBottomTabNavigator();
const Home = () => (
  <MainViewStateProvider>
    <HomeScreen />
  </MainViewStateProvider>
);

export default function BottomTabNavigator() {
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
          elevation: 3,
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
}
