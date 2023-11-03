import {View, StyleSheet, Image, ImageEditor} from 'react-native';
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
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_GRAY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function Warn() {
  const {ref, state, actions} = useProductDetailViewModel();

  return (
    <View style={{padding: 16}}>
      {/* {state.data.brand_name === '오송' ? ( */}
      <View>
        <View>
          <View>
            <View>
              <B20 customStyle={{marginTop: 24}}>최초 배송비</B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>무료</B12>
              <B20 customStyle={{marginTop: 24}}>변심 배송비 (개당/편도)</B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                5,000원
              </B12>
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
              <B20 customStyle={{marginTop: 24}}>교환 안내</B20>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                상품 택(tag)제거 또는 개봉으로 상품 가치 훼손 시에는 상품수령후
                7일 이내라도 교환 및 반품이 불가능합니다.
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                저단가 상품, 일부 특가 상품은 고객 변심에 의한 교환, 반품은
                고객께서 배송비를 부담하셔야 합니다(제품의 하자,배송오류는 제외)
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                일부 상품은 신모델 출시, 부품가격 변동 등 제조사 사정으로 가격이
                변동될 수 있습니다.
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                신발의 경우, 실외에서 착화하였거나 사용흔적이 있는 경우에는
                교환/반품 기간내라도 교환 및 반품이 불가능 합니다.
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                수제화 중 개별 주문제작상품(굽높이,발볼,사이즈 변경)의 경우에는
                제작완료, 인수 후에는 교환/반품기간내라도 교환 및 반품이 불가능
                합니다.
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                수입,명품 제품의 경우, 제품 및 본 상품의 박스 훼손, 분실 등으로
                인한 상품 가치 훼손 시 교환 및 반품이 불가능 하오니, 양해
                바랍니다.
              </B12>
              <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
                일부 특가 상품의 경우, 인수 후에는 제품 하자나 오배송의 경우를
                제외한 고객님의 단순변심에 의한 교환, 반품이 불가능할 수
                있사오니, 각 상품의 상품상세정보를 꼭 참조하십시오.
              </B12>
            </View>
          </View>
        </View>
        <View>
          <B20 customStyle={{marginTop: 24}}>배송 안내</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            티클링 진행 중 재고가 소진될 수 있으며, 재고가 부족한 경우 배송이
            지연될 수 있습니다.
          </B12>
        </View>
        <View>
          <B20 customStyle={{marginTop: 24}}>환불 안내</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            상품 청약철회 가능기간은 상품 수령일로 부터 7일 이내 입니다.
          </B12>
        </View>
        <View>
          <B20 customStyle={{marginTop: 24}}>A/S 안내</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수
            있습니다.
          </B12>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            A/S는 판매자에게 문의하시기 바랍니다.
          </B12>
        </View>
        <View>
          <B20 customStyle={{marginTop: 24}}>A/S 책임자와 전화번호</B20>
          <B12 customStyle={{color: COLOR_GRAY, marginTop: 12}}>
            오송유통 / 070-4416-5101
          </B12>
        </View>
      </View>
      {/* // ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({});
