import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {MainContainer} from '../../components/Global/Containers/MainContainer';
// import {useTokenHandler} from '../../components/Splash/useTokenHandler';
// import {SplashLogo} from '../../components/Splash/SplashLogo';
import {MainContainer} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {SplashLogo} from 'src/presentationLayer/view/components/startComponents/SplashComponents/SplashLogo';

import {loginTokenData} from 'src/dataLayer/DataSource/Auth/LoginTokenData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

export default function SplashScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {topActions} = useTopViewModel();

  useEffect(() => {
    loginTokenData().then(res => {
      if (res.DScode === 0) {
        // console.log('@@@@@@login@@@@@@');
        navigation.reset({routes: [{name: 'main'}]});
      } else {
        // console.log('@@@@@@signup@@@@@@');
        navigation.reset({routes: [{name: 'signup1'}]});
      }
    });
  }, []);

  return (
    <MainContainer>
      <SplashLogo />
    </MainContainer>
  );
}
