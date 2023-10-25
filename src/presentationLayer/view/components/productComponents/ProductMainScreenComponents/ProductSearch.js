import React from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import FilterSearch from 'src/assets/icons/FilterSearch';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B,
  B12,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ProductSearchChips from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearchChips';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import FilterAndSelectedState from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/FilterAndSelectedState';

export default function ProductSearch() {
  const {state, actions} = useProductMainViewModel();

  const priceRanges = [
    {label: '전체가격', min: 0, max: null},
    {label: '5천~5만', min: 5000, max: 50000},
    {label: '5만~10만', min: 50000, max: 100000},
    {label: '10만~30만', min: 100000, max: 300000},
    {label: '30만~100만', min: 300000, max: 1000000},
    {label: '100만 이상', min: 1000000, max: 999999999},
  ];

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: windowWidth,
        alignItems: 'center',
        zIndex: 2,
        borderColor: COLOR_SEPARATOR,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          width: windowWidth - 32,
          paddingTop: 16,
          marginBottom: 4,
        }}>
        <View style={styles.searchContainer}>
          <View style={styles.searchbar}>
            <TextInput
              style={styles.input}
              placeholder="상품 이름으로 검색하기"
              placeholderTextColor={COLOR_GRAY}
              value={state.search} // Bind the value prop to the search prop
              onChangeText={text => actions.setSearch(text)} // Update the search value using setSearch
            />
          </View>
          <AnimatedButton
            style={styles.searchIconContainer}
            onPress={() => {
              actions.onRefresh();
            }}>
            <SearchNormal1
              width={20}
              height={20}
              stroke={COLOR_BLACK}
              strokeWidth={1.2}
              scale={1.1}
            />
          </AnimatedButton>
        </View>
      </View>

      <FilterAndSelectedState />
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchbar: {
    backgroundColor: backgroundColor,
    backgroundColor: COLOR_WHITE,
    borderRadius: 40,
    flexDirection: 'row',
    width: windowWidth - 16 - 16 - 40 - 40 - 12 - 24,
  },
  input: {
    color: COLOR_BLACK,
    marginLeft: 12,
    padding: 0,
    fontFamily: B,
    fontSize: 15,
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconContainer: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_SEPARATOR,
    backgroundColor: COLOR_WHITE,
    marginRight: 8,
    position: 'relative',
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  filterContainer: {
    marginTop: 16,
    // paddingBottom: 4,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 2,
    paddingVertical: 6,
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceInput: {
    flex: 1,
    borderColor: COLOR_SEPARATOR,
    backgroundColor: COLOR_WHITE,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginRight: 8,
    fontFamily: B,
    fontSize: 13,
    color: COLOR_BLACK,
  },
  selectedChip: {
    backgroundColor: COLOR_PRIMARY, // Change to desired background color for selected chip
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  selectedChipText: {
    color: COLOR_WHITE, // Change to desired text color for selected chip
  },
});
