import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  B,
  B12,
  B17,
  B20,
  EB,
  UNIQUE22,
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
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {CONTRACT_URL, PRIVATECONTRACT_URL} from '@env';

export default function Footer() {
  return (
    <View
      style={{
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
        flexDirection: 'column',
        borderTopWidth: 0.5,
        borderTopColor: COLOR_GRAY,
        margin: windowWidth * 0.03,
        marginBottom: 80,
        width: windowWidth * 0.94,
      }}>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <UNIQUE22 customStyle={{color: COLOR_GRAY}}>TIKKLE</UNIQUE22>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: 10,
        }}>
        <B12 customStyle={{color: COLOR_GRAY}}>
          (주)라이폴리는 통신판매중개업자로서 통신판매의 당사자가 아니며{'\n'}
          상품의 주문 배송 및 환불 등과 관련한 의무와 책임은 각 판매자에게
          있습니다.
        </B12>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View>
          <View></View>
        </View>
        <B12 customStyle={{color: COLOR_GRAY}}>
          상호명: 라이폴리
          {'\n'}
          대표: 이흥규
          {'\n'}
          사업자등록번호: 000-00-00000 |{'\n'}
          통신판매업신고번호: 제2021-서울강남-00000호
          {'\n'}개인정보관리책임자: 김현수
          {'\n'}
          주소: 서울특별시 서초구 사임당로 8길 13, 4층 402호-a593
          {'\n'}
        </B12>
      </View>

      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <AnimatedButton
            onPress={() => {
              Linking.openURL(CONTRACT_URL);
            }}>
            <B12 customStyle={{color: COLOR_GRAY}}>이용약관 |</B12>
          </AnimatedButton>
        </View>

        <View>
          <AnimatedButton
            onPress={() => {
              Linking.openURL(PRIVATECONTRACT_URL);
            }}>
            <B12 customStyle={{color: COLOR_GRAY}}> 개인정보처리방침 |</B12>
          </AnimatedButton>
        </View>

        <B12 customStyle={{color: COLOR_GRAY}}> 제휴문의 | 입점문의</B12>
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
