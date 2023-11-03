import {View, StyleSheet, Image, ImageEditor} from 'react-native';
import React, {useEffect} from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import AutoHeightImage from 'react-native-auto-height-image';
import {LongImageSplitter} from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/LongImageSplitter';

export default function DetailImages() {
  const {ref, state, actions} = useProductDetailViewModel();

  return <View>{state.components}</View>;
}

const styles = StyleSheet.create({});
