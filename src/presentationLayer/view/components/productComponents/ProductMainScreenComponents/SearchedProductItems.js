import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  SPACING_1,
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B12,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';

export default function SearchedProductItems({productData, category}) {
  const {state, actions} = useProductMainViewModel();

  useEffect(() => {
    if (state.searchedData.length === 0) {
      actions.setLoading(true);
      setTimeout(() => {
        actions.setLoading(false);
      }, 2000);
    }
  }, [state.searchedData]);

  const data = state.searchedData.length > 0 ? state.searchedData : [];
  const scaleValues = data.map(() => new Animated.Value(1));

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {state.searchedData.map((item, index) => (
        <AnimatedButton
          onPress={() => {
            navigation.navigate('productDetail', item);
          }}
          style={[
            styles.itemContainer,
            {transform: [{scale: scaleValues[index]}]},
          ]}
          key={item.id}>
          <Image
            source={{uri: item.thumbnail_image}}
            style={styles.imageContainer}
          />
          <View style={styles.textContainer}>
            <B17 customStyle={styles.title}>{item.name}</B17>
            <B12 customStyle={styles.brand}>{item.brand_name}</B12>
            <B12 customStyle={styles.price}>
              ￦{item.price.toLocaleString()}
            </B12>
          </View>
        </AnimatedButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%', // to get two items per row with some space between
    marginBottom: SPACING_2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
    padding: 8,
    paddingBottom: 12,
    borderRadius: 16,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: windowWidth / 2 - SPACING_4 * 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: SPACING_1,
    paddingTop: SPACING_1,
  },
  brand: {
    color: COLOR_GRAY,
  },
});
