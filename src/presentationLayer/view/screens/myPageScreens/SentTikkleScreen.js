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
  const data = [
    {
      id: 1,
      name: 'User 1',
      productName: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      price: 100000,
      quantity: 1,

      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Bada55',
      created_at: '2021-05-10T14:00:00.000Z',
    },
    {
      id: 2,
      name: 'User 2',
      productName: 'apple watch',
      brand: 'apple',
      productID: 2013402302,
      price: 100000,
      quantity: 1,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#C0ffee',
      created_at: '2021-05-10T14:00:00.000Z',
    },
    {
      id: 3,
      name: 'User 3',
      productName: '서어언물',
      brand: 'pear',
      productID: 2013402302,
      price: 100000,
      quantity: 1,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#F00dab',
      created_at: '2021-05-10T14:00:00.000Z',
    },
    {
      id: 4,
      name: 'User 4',
      productName: '고오급 지갑',
      brand: 'PRADA',
      productID: 2013402302,
      price: 100000,
      quantity: 1,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Babe42',
      created_at: '2021-05-10T14:00:00.000Z',
    },
    {
      id: 5,
      name: 'User 5',
      productName: '에어팟 프로 2세대',
      brand: 'apple',
      productID: 2013402302,
      price: 100000,
      quantity: 1,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#Fa1afe',
      created_at: '2021-05-10T14:00:00.000Z',
    },
    {
      id: 6,
      name: 'User 6',
      productName: '맥북 에어 16인치',
      brand: 'apple',
      productID: 2013402302,
      price: 100000,
      quantity: 1,
      productImage:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      backgroundColor: '#F0a2be',
      created_at: '2021-05-10T14:00:00.000Z',
    },
  ];
  return (
    <View>
      <View style={{backgroundColor: backgroundColor}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(item.id)}
          ListHeaderComponent={SendTikkleScreenHeader}
          stickyHeaderIndices={[0]}
          ListFooterComponent={() => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    paddingHorizontal: 24,
                    backgroundColorcolor: COLOR_BLACK,
                    marginBottom: 20,
                  }}>
                  <AnimatedButton
                    style={{
                      backgroundColor: COLOR_WHITE,
                      borderRadius: 5,
                      margin: 16,
                      elevation: 1,
                      borderColor: COLOR_SEPARATOR,
                      // height: 100,
                      borderWidth: 0.5,
                      // padding: 16,
                      paddingBottom: 16,
                      paddingTop: 24,
                      width: windowWidth - 32,
                      // backgroundColor: 'red',
                    }}
                    onPress={() => {
                      console.log('hihi22');
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <B15>더보기</B15>
                    </View>
                  </AnimatedButton>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 24,
                    marginTop: 0,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <B20 customStyle={{marginLeft: 12}}>To. 엄승주</B20>
                  </View>
                </View>
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
