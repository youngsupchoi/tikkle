import {ScrollView, View, StyleSheet} from 'react-native';
import React from 'react';
// import {B12, B15, M11} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {B12} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
const categories = [
  {
    id: 1,
    name: '많은 판매',
    sortAttribute: 'sales_volume',
    sortWay: 'DESC',
  },
  {
    id: 2,
    name: '높은 조회수',
    sortAttribute: 'views',
    sortWay: 'DESC',
  },
  {
    id: 3,
    name: '많은 위시리스트',
    sortAttribute: 'wishlist_count',
    sortWay: 'DESC',
  },
  {
    id: 4,
    name: '높은 가격',
    sortAttribute: 'price',
    sortWay: 'DESC',
  },
  {
    id: 5,
    name: '낮은 가격',
    sortAttribute: 'price',
    sortWay: 'ASC',
  },
];

export default function ProductSearchChips(props) {
  const {
    sortAttribute,
    setSortAttribute,
    sortWay,
    setSortWay,
    selectedSort,
    setSelectedSort,
  } = props;

  return (
    <View>
      <B12>정렬 선택</B12>
      <ScrollView
        style={{
          backgroundColor: backgroundColor,
          // paddingBottom: 8,
          // elevation: 1,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <AnimatedButton
            key={category.id}
            style={[
              styles.itemContainer,
              sortAttribute === category.sortAttribute &&
              sortWay === category.sortWay
                ? styles.selectedItem
                : {}, // Apply selected style if this category is selected
            ]}
            onPress={() => {
              setSortAttribute(category.sortAttribute);
              setSortWay(category.sortWay);
              setSelectedSort(category.name);
            }}>
            <B12
              customStyle={[
                styles.text,
                sortAttribute === category.sortAttribute &&
                sortWay === category.sortWay
                  ? styles.selectedText
                  : {}, // Apply selected text style if this category is selected
              ]}>
              {category.name}
            </B12>
          </AnimatedButton>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_SEPARATOR,
    elevation: 0,
    backgroundColor: COLOR_WHITE,
    marginRight: 8,
    position: 'relative',
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  image: {
    position: 'absolute',
    borderRadius: 8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: COLOR_PRIMARY, // Change to your desired selected background color
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  selectedText: {
    color: COLOR_WHITE, // Change to your desired selected text color
  },
});
