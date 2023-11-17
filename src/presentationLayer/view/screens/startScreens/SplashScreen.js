import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {MainContainer} from '../../components/Global/Containers/MainContainer';
// import {useTokenHandler} from '../../components/Splash/useTokenHandler';
// import {SplashLogo} from '../../components/Splash/SplashLogo';
import {MainContainer} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {SplashLogo} from 'src/presentationLayer/view/components/startComponents/SplashComponents/SplashLogo';
import {loginTokenData} from 'src/dataLayer/DataSource/Auth/LoginTokenData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {
  COLOR_PRIMARY,
  backgroundColor,
} from '../../components/globalComponents/Colors/Colors';
import {SafeAreaView} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export default function SplashScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {topActions} = useTopViewModel();
  SystemNavigationBar.setNavigationColor(COLOR_PRIMARY);

  useEffect(() => {
    loginTokenData().then(res => {
      if (res.DScode === 0) {
        // console.log('@@@@@@login@@@@@@');
        navigation.reset({routes: [{name: 'main'}]});
        SystemNavigationBar.setNavigationColor(backgroundColor);
      } else {
        // console.log('@@@@@@signup@@@@@@');
        navigation.reset({routes: [{name: 'SignUpNavigator'}]});
        SystemNavigationBar.setNavigationColor(backgroundColor);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        //backgroundColor: 'blue',
        backgroundColor: COLOR_PRIMARY,
      }}>
      <MainContainer>
        <SplashLogo />
      </MainContainer>
    </SafeAreaView>
  );
}
