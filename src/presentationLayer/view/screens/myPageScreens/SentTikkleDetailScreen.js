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

export default function SentTikkleDetailScreen({route}) {
  const item = route.params.item;
  const {ref, state, actions} = useMyPageViewModel();
  return (
    <View>
      <FlatList
        data={[item]}
        keyExtractor={(item, index) => String(item.id)}
        ListHeaderComponent={SendTikkleScreenHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={() => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'columns',
                  marginTop: 50,
                  alignSelf: 'center',
                  paddingHorizontal: 24,
                  backgroundColorcolor: COLOR_BLACK,
                }}>
                <AnimatedButton
                  onPress={() => {
                    actions.navigation.navigate('CustomerCenter');
                  }}
                  style={styles.buttonStyle}>
                  <B15 customStyle={styles.buttonText}>고객센터</B15>
                </AnimatedButton>
                <AnimatedButton
                  onPress={() => {
                    actions.refundPolicyLink();
                  }}
                  style={styles.buttonStyle}>
                  <B15 customStyle={styles.buttonText}>취소 환불 안내</B15>
                </AnimatedButton>
              </View>
            </View>
          );
        }}
        renderItem={({item, index}) => {
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
                  <B20 customStyle={{marginLeft: 3}}>To. {item.user_name}</B20>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 16,
                  margin: 16,
                  marginTop: 5,
                  elevation: 1,
                  borderColor: COLOR_SEPARATOR,
                  // height: 100,
                  borderWidth: 0.5,
                  // padding: 16,
                  paddingBottom: 16,
                  paddingTop: 15,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    marginTop: 5,
                    right: 15,
                  }}></View>
                <View
                  style={{
                    width: '100%',
                    height: windowWidth * 0.35,
                    alignItems: 'top',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: windowWidth * 0.035,
                  }}>
                  <View>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: item.product_image,
                      }}
                      style={{
                        width: windowWidth * 0.25,
                        height: windowWidth * 0.25,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: COLOR_SEPARATOR,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 5,
                      width: windowWidth * 0.55,
                      height: windowWidth * 0.25,
                      backgroundColor: 'red',
                    }}>
                    <M15>{item.brand_name}</M15>
                    <M15>{item.product_name}</M15>
                    <M15>{item.product_price}원</M15>
                    <M15>{item.send_quantity}개</M15>
                  </View>
                </View>
                <View
                  style={{
                    width: '90%',
                    height: 1,
                    backgroundColor: COLOR_BLACK,
                  }}></View>
                <View
                  style={{
                    width: '100%',
                    height: 150,
                    alignItems: 'top',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: windowWidth * 0.035,
                  }}>
                  <View>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: item.product_image,
                      }}
                      style={{
                        width: windowWidth * 0.25,
                        height: windowWidth * 0.25,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: COLOR_SEPARATOR,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 5,
                      width: windowWidth * 0.55,
                      height: windowWidth * 0.25,
                      backgroundColor: 'red',
                    }}>
                    <M15>{item.brand_name}</M15>
                    <M15>{item.product_name}</M15>
                    <M15>{item.product_price}원</M15>
                    <M15>{item.send_quantity}개</M15>
                  </View>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    bottom: -30,
                    right: 8,
                    width: 200,
                  }}>
                  <M15>{item.send_at}</M15>
                </View>
              </View>
            </View>
          );
        }}
      />
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
  buttonStyle: {
    padding: 5,
    borderRadius: 14,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 2,
    marginBottom: 10,
  },
});
