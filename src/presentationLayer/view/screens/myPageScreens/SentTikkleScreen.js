import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B17,
  B20,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowRight from 'src/assets/icons/ArrowRight';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SecurityUser from 'src/assets/icons/SecurityUser';
import Receipt1 from 'src/assets/icons/Receipt1';
import TickSquare from 'src/assets/icons/TickSquare';
import ProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/ProfileHeader';

import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/SignUpHeaderComponent';
import SendTikkleScreenHeader from 'src/presentationLayer/view/components/myPageComponents/sendTikkleScreenComponents/SendTikkleScreenHeaderComponent';
import SendTikkle from 'src/presentationLayer/view/components/myPageComponents/sendTikkleScreenComponents/SendTikkeComponent';
import Footer from '../../components/globalComponents/Headers/FooterComponent';

export default function SendTikkleScreen() {
  const {ref, state, actions} = useMyPageViewModel();

  useEffect(() => {
    actions.MyPageData();
  }, []);

  useEffect(() => {
    actions.setLoading_profile(false);
  }, [
    state.userData_profile,
    state.endTikklingsData,
    state.paymentHistoryData,
  ]);

  //==============================================================================================

  if (!state.userData_profile)
    return <ActivityIndicator size="large" color="#0000ff" />;
  const navigation = useNavigation();

  return (
    <View>
      <View style={{backgroundColor: backgroundColor}}>
        <FlatList
          data={state.paymentHistoryData}
          keyExtractor={(item, index) => String(item.send_at)}
          ListHeaderComponent={SendTikkleScreenHeader}
          stickyHeaderIndices={[0]}
          ListFooterComponent={() => {
            return (
              <Footer />
              // <View>
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       alignSelf: 'center',
              //       paddingHorizontal: 24,
              //       backgroundColorcolor: COLOR_BLACK,
              //       marginBottom: 20,
              //     }}>
              //     <AnimatedButton
              //       style={{
              //         backgroundColor: COLOR_WHITE,
              //         borderRadius: 5,
              //         margin: 16,
              //         elevation: 1,
              //         borderColor: COLOR_SEPARATOR,
              //         // height: 100,
              //         borderWidth: 0.5,
              //         // padding: 16,
              //         paddingBottom: 16,
              //         paddingTop: 24,
              //         width: windowWidth - 32,
              //         // backgroundColor: 'red',
              //       }}
              //       onPress={() => {
              //         console.log('hihi22');
              //       }}>
              //       <View
              //         style={{
              //           width: '100%',
              //           height: 20,
              //           alignItems: 'center',
              //           justifyContent: 'center',
              //         }}>
              //         <B15>더보기</B15>
              //       </View>
              //     </AnimatedButton>
              //   </View>
              // </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{}}>
                <View
                  style={{
                    backgroundColor: COLOR_WHITE,
                    borderRadius: 16,
                    margin: 16,
                    elevation: 1,
                    borderColor: COLOR_SEPARATOR,
                    // height: 100,
                    borderWidth: 0.5,
                    // padding: 16,
                    paddingBottom: 16,
                    paddingTop: 24,
                    // backgroundColor: 'red',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 120,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <M15>아직 보낸 티클 내역이 없어요.</M15>
                  </View>
                </View>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return <SendTikkle item={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
    paddingTop: StatusBarHeight,
  },
});
