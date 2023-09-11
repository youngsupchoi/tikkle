import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
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
  B15,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Refresh from 'src/assets/icons/Refresh';
import ProductSearchChips from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearchChips';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';

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
        backgroundColor: state.showFilter ? backgroundColor : backgroundColor,
        width: windowWidth,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: windowWidth - 32,
          paddingTop: 16,
          marginBottom: 12,
        }}>
        <View style={styles.searchContainer}>
          <AnimatedButton
            style={styles.filterIconContainer}
            onPress={() => {
              actions.setShowFilter(!state.showFilter);
            }}>
            <FilterSearch
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1.5}
              scale={1.2}
            />
          </AnimatedButton>
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
            style={styles.filterIconContainer}
            onPress={() => {
              actions.setSelectedRange('전체가격');
              actions.setPriceMax(999999999);
              actions.setPriceMin(0);
              actions.setSearch('');
              actions.setSortAttribute('sales_volume');
              actions.setSortWay('DESC');
              actions.setSelectedSort('많은 판매');
            }}>
            <Refresh
              width={20}
              height={20}
              stroke={COLOR_BLACK}
              strokeWidth={1.2}
              scale={1.1}
            />
          </AnimatedButton>
        </View>
        {state.showFilter && (
          <View style={styles.filterContainer}>
            <B12>가격대 선택</B12>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {priceRanges.map((range, index) => (
                <AnimatedButton
                  key={index}
                  style={[
                    styles.chip,
                    state.selectedRange === range.label && styles.selectedChip,
                  ]}
                  onPress={() => {
                    actions.setSelectedRange(range.label);
                    actions.setPriceMin(range.min);
                    if (range.max !== 'Infinity') {
                      actions.setPriceMax(range.max);
                    } else {
                      actions.setPriceMax(''); // or set to a very large number if you prefer
                    }
                  }}>
                  <B12
                    customStyle={
                      state.selectedRange === range.label &&
                      styles.selectedChipText
                    }>
                    {range.label}
                  </B12>
                </AnimatedButton>
              ))}
            </ScrollView>

            <View>
              <ProductSearchChips
                sortAttribute={state.sortAttribute}
                setSortAttribute={actions.setSortAttribute}
                sortWay={state.sortWay}
                setSortWay={actions.setSortWay}
                selectedSort={state.selectedSort}
                setSelectedSort={actions.setSelectedSort}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    // height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    padding: 8,
    backgroundColor: COLOR_WHITE,
    marginBottom: 2,
    borderRadius: 40,
  },
  searchbar: {
    backgroundColor: backgroundColor,
    backgroundColor: COLOR_WHITE,
    // borderColor: COLOR_SEPARATOR,
    // borderWidth: .5,
    borderRadius: 40,
    flexDirection: 'row',
    width: windowWidth - 16 - 16 - 40 - 40 - 12 - 24,
  },
  input: {
    marginLeft: 4,
    color: COLOR_BLACK,
    alignSelf: 'flex-end',
    lineHeight: 20,
    fontFamily: M,
    padding: 0,
    // backgroundColor: 'red',
    paddingVertical: 10,
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
  },
  selectedChipText: {
    color: COLOR_WHITE, // Change to desired text color for selected chip
  },
});
