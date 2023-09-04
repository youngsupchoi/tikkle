import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MainContainer} from '../../components/Global/Containers/MainContainer';
import {useTokenHandler} from '../../components/Splash/useTokenHandler';
import {SplashLogo} from '../../components/Splash/SplashLogo';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {printTokensFromAsyncStorage} = useTokenHandler();

  useEffect(() => {
    printTokensFromAsyncStorage().then(res =>
      setTimeout(() => {
        if (res) {
          navigation.reset({routes: [{name: 'main'}]});
        } else {
          navigation.reset({routes: [{name: 'signup1'}]});
        }
      }, 500),
    );
  }, []);

  return (
    <MainContainer>
      <SplashLogo />
    </MainContainer>
  );
}
