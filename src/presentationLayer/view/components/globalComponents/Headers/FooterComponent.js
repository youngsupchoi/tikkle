import {View, StyleSheet, Linking} from 'react-native';
import React from 'react';
import {
  B,
  EB,
  UNIQUE22,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  backgroundColor,
  COLOR_GRAY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {CONTRACT_URL, PRIVATECONTRACT_URL, INQ_URL} from '@env';
import {navigate} from 'src/navigation/stackNavigators/MainStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Footer({style}) {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          paddingVertical: 16,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: COLOR_SEPARATOR,
          marginBottom: 50,
        },
        style,
      ]}>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        <UNIQUE22 customStyle={{color: COLOR_GRAY}}>TIKKLE</UNIQUE22>
      </View>
      <View
        style={{
          width: '100%',
          marginBottom: 24,
        }}>
        <M11 customStyle={{color: COLOR_GRAY}}>
          (주)라이폴리는 통신판매중개업자로서 통신판매의 당사자가 아니며{'\n'}
          상품의 주문 배송 및 환불 등과 관련한 의무와 책임은 각 판매자에게
          있습니다.
        </M11>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 16,
        }}>
        <View style={{width: '50%'}}>
          <View style={{marginBottom: 8}}>
            <M11>상호명 </M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>
              (주)라이폴리
            </M11>
          </View>
          <View style={{marginBottom: 8}}>
            <M11>대표이사 </M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>이흥규</M11>
          </View>
          <View style={{marginBottom: 8}}>
            <M11>사업자등록번호</M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>
              363-86-03182
            </M11>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <View style={{marginBottom: 8}}>
            <M11>통신판매업신고번호</M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>
              2023-서울서초-3241
            </M11>
          </View>
          <View style={{marginBottom: 8}}>
            <M11>개인정보관리책임자</M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>이흥규</M11>
          </View>
          <View style={{marginBottom: 8}}>
            <M11>주소</M11>
            <M11 customStyle={{marginLeft: 8, color: COLOR_GRAY}}>
              서울특별시 서초구 사임당로 8길 13, 4층 402호-a593
            </M11>
          </View>
        </View>
        {/* <M11 customStyle={{color: COLOR_GRAY}}>
          상호명: (주)라이폴리
          {'\n'}
          대표이사: 이흥규
          {'\n'}
          사업자등록번호: 363-86-03182
          {'\n'}
          통신판매업신고번호: 2023-서울서초-3241
          {'\n'}
          개인정보관리책임자: 이흥규
          {'\n'}
          주소: 서울특별시 서초구 사임당로 8길 13, 4층 402호-a593
          {'\n'}
        </M11> */}
      </View>

      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <AnimatedButton
            onPress={() => {
              Linking.openURL(CONTRACT_URL);
            }}>
            <M11 customStyle={{color: COLOR_GRAY}}>이용약관</M11>
          </AnimatedButton>
        </View>

        <View>
          <M11 customStyle={{color: COLOR_GRAY}}> | </M11>
        </View>

        <View>
          <AnimatedButton
            onPress={() => {
              Linking.openURL(PRIVATECONTRACT_URL);
            }}>
            <M11 customStyle={{color: COLOR_GRAY}}>개인정보처리방침</M11>
          </AnimatedButton>
        </View>

        <View>
          <M11 customStyle={{color: COLOR_GRAY}}> | </M11>
        </View>

        <View>
          <AnimatedButton
            onPress={() => {
              Linking.openURL(INQ_URL);
            }}>
            <M11 customStyle={{color: COLOR_GRAY}}>문의하기</M11>
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flex: 1,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
  },
  small_header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 6,
    // height: HEADER_HEIGHT,
  },
  titleBox: {
    marginTop: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth - 32,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  contentBox: {
    marginTop: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    height: 450,
    width: windowWidth - 32,
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  searchText: {
    color: COLOR_BLACK,
    marginLeft: 12,
    padding: 0,
    fontFamily: B,
    fontSize: 15,
  },
  buttonStyle: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});
