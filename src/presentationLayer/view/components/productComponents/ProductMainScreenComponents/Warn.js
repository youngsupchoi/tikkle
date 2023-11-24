import {View, StyleSheet, Image, ImageEditor, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import AutoHeightImage from 'react-native-auto-height-image';
import {LongImageSplitter} from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/LongImageSplitter';
import {
  B12,
  B15,
  B20,
  M11,
  B17,
  M15,
  M17,
  B,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from '../../globalComponents/Buttons/AnimatedButton';
import {INQ_URL} from '@env';

export default function Warn() {
  const {ref, state, actions} = useProductDetailViewModel();

  return (
    <View style={{padding: 16, backgroundColor: COLOR_WHITE}}>
      <View>
        {/* <View style={{marginBottom: 24}}>
          <B20 customStyle={{marginTop: 24, marginBottom: 10}}>
            필수 표기 정보
          </B20>
          <View>
            {Object.entries(state.infoData).map(([key, value]) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderBottomColor: COLOR_SEPARATOR,
                  paddingBottom: 12,
                  borderBottomWidth: 0.5,
                  borderTopColor: COLOR_SEPARATOR,
                  borderTopWidth: 0.5,
                }}
                key={key}>
                <View style={{flex: 1, marginRight: 10}}>
                  <B12>{key}</B12>
                </View>
                <View style={{flex: 2}}>
                  <M11 customStyle={{color: COLOR_GRAY}}>{value}</M11>
                </View>
              </View>
            ))}
          </View>
        </View> */}

        <View>
          <View>
            <View>
              <B20 customStyle={{marginTop: 24}}>최초 배송비</B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>무료</B12>
              {/* <B20 customStyle={{marginTop: 24}}>변심 배송비 (개당/편도)</B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                5,000원
              </B12> */}
              <B20 customStyle={{marginTop: 24}}>
                제주 추가배송비 (개당/편도)
              </B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                5,000원
              </B12>
              <B20 customStyle={{marginTop: 24}}>
                도서산간 추가배송비 (개당/편도)
              </B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                10,000원
              </B12>
            </View>
            <View>
              <B20 customStyle={{marginTop: 24}}>환불/교환 안내</B20>

              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                {
                  '티클 상품권으로 구매한 상품에 대해서는 고객 변심에 의한 교환, 환불은 불가능합니다. (제품의 하자,배송오류는 제외)\n제품의 하자, 배송오류로인한 교환/환불 신청은 문의를 통해 신청해주시기 바랍니다.'
                }
              </B12>
              <AnimatedButton
                style={{marginTop: 3}}
                onPress={() => {
                  Linking.openURL(INQ_URL);
                }}>
                <B12 customStyle={{color: 'blue'}}> 교환/환불 문의</B12>
              </AnimatedButton>
            </View>
          </View>
        </View>

        <View>
          <B20 customStyle={{marginTop: 24}}>배송 안내</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            {
              '티클링 진행 중 재고가 소진될 수 있으며, 재고가 부족한 경우 배송이 지연될 수 있습니다.'
            }
          </B12>
        </View>
        <View>
          <B20 customStyle={{marginTop: 24}}>A/S 안내</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            {
              '소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.'
            }
          </B12>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 0}}>
            {
              'A/S는 판매자에게 문의하시기 바랍니다. A/S연락처는 상단의 상품 고시정보를 참고해주세요.'
            }
          </B12>
        </View>
        {/* <View>
          <B20 customStyle={{marginTop: 24}}>A/S 책임자와 전화번호</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            {console.log(state.data.brand)}
            오송유통 / 070-4416-5101
          </B12>
        </View> */}
      </View>
      {/* // ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({});
