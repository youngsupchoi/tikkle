// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useProductDetailViewState} from 'src/presentationLayer/viewState/productStates/ProductDetailState';
import {View, StyleSheet, Image, Platform} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
// 2. 데이터 소스 또는 API 가져오기
import {getProductInfoData} from 'src/dataLayer/DataSource/Product/GetProductInfoData';
import {useNavigation, useRoute} from '@react-navigation/native';
import {deleteMyWishlistData} from 'src/dataLayer/DataSource/User/DeleteMyWishlistData';
import {createMyWishlistData} from 'src/dataLayer/DataSource/Product/CreateMyWishlistData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useState} from 'react';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {getProductOptionData} from 'src/dataLayer/DataSource/Product/GetProductOptionData';
import WebView from 'react-native-webview';
// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useProductDetailViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useProductDetailViewState();
  const {topActions} = useTopViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();

  const temp_R = useRoute();
  const route_product_id = temp_R.params?.product_id;

  const loadDetailData = async () => {
    await actions.setLoading(true);
    await getDetailData();
    await actions.setLoading(false);
  };

  const getDetailData = async () => {
    await getProductInfoData(route_product_id)
      .then(async res => {
        // console.log('getProductInfoData : ', res);
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        actions.setData(res.DSdata.info);
        // actions.setInfoData(res.DSdata.info.);
        //console.log('res.DSdata.info : ', res.DSdata.info);
        return res.DSdata.info;
      })
      .then(async info => {
        //console.log('info : ', info.images);
        await cutImage(info.images);
        if (info.wishlisted) {
          await actions.setWishlisted(true);
        }

        await isTikkling();
      });
  };

  /**
   * 상세페에지 오류시 티클링 중인지 아닌지 확인
   */
  const isTikkling = async () => {
    await getMyUserInfoData()
      .then(async res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        if (res.DSdata.info.is_tikkling == 0) {
          actions.setIsTikkling(false);
        } else {
          actions.setIsTikkling(true);
        }
      });
  };

  const hasOptions = async productId => {
    try {
      const res = await getProductOptionData(productId);

      actions.setProductOptions(res.DSdata.options);

      let optionStatus = null;

      if (!res.DSdata.options.default) {
        optionStatus = true;
      } else if (res.DSdata.options.default) {
        optionStatus = false;
      }

      actions.setItHasOptions(optionStatus);
      topActions.setStateAndError(res);
      return optionStatus; // 옵션 상태 반환
    } catch (error) {
      console.error('Error fetching product options:', error);
      throw error;
    }
  };

  const tikklingStartButtonPressWithOptions = () => {
    // navigation.navigate('startTikkling', wishlist);
    actions.setShowProductOptionsModal(false);
  };

  const deleteMyWishlistData_ = async productId => {
    await deleteMyWishlistData(productId).then(res => {
      console.log('Delete : ', res);
      return topActions.setStateAndError(res);
    });
  };

  const createMyWishlistData_ = async productId => {
    await createMyWishlistData(productId).then(res => {
      console.log('Add : ', res);
      return topActions.setStateAndError(res);
    });
  };

  const cutImage = async in_images => {
    // console.log('sdfsdfsdfsdf', data.images);
    const images = JSON.parse(in_images);

    /// 이미지 표시하기
    const components = [];

    for (let i = 1; ; i++) {
      if (images[i.toString()] === undefined) {
        break;
      }
      let temp;

      if (Platform.OS === 'ios') {
        temp = (
          <View key={i}>
            <AutoHeightImage
              width={windowWidth}
              source={{
                uri: images[i.toString()],
              }}
            />
          </View>
        );

        components.push(temp);

        //
      } else {
        Image.getSize(
          images[i.toString()],
          (width, height) => {
            const ratio = height / width;
            const height_im = windowWidth * ratio;
            let temp_2 = (
              <View key={i}>
                <WebView
                  style={{flex: 1, width: windowWidth, height: height_im}}
                  source={{
                    uri: images[i.toString()],
                  }}
                />
              </View>
            );

            components.push(temp_2);
          },
          error => {
            console.error(`Error getting image size: ${error}`);
          },
        );

        temp = (
          <View key={i}>
            <WebView
              style={{flex: 1, width: windowWidth, height: 1000}}
              source={{
                uri: images[i.toString()],
              }}
            />
          </View>
        );
      }
    }

    actions.setComponents(components);
  };

  return {
    ref,
    state: {
      ...state,
    },
    actions: {
      ...actions,
      deleteMyWishlistData_,
      createMyWishlistData_,
      navigation,
      isTikkling,
      hasOptions,
      cutImage,
      loadDetailData,
      tikklingStartButtonPressWithOptions,
    },
  };
};
