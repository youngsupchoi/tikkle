import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import AutoHeightImage from 'react-native-auto-height-image';

export default function DetailImages() {
  const {ref, state, actions} = useProductDetailViewModel();

  const images1 = JSON.parse(state.data.images);

  const components = [];

  for (let i = 1; ; i++) {
    if (images1[i.toString()] === undefined) {
      break;
    }
    temp = (
      <View key={i}>
        <AutoHeightImage
          width={windowWidth}
          source={{
            uri: images1[i.toString()],
          }}
        />
      </View>
    );

    components.push(temp);
  }

  return (ret = <View>{components}</View>);
}

const styles = StyleSheet.create({});
