import React from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {B12} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';

const SelectedStateHeader = ({scrollY}) => {
  const {state, actions} = useProductMainViewModel();

  return (
    <View style={[styles.headerContainer]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* //TODO: 주석 삭제 */}
        {/* {state.selectedCategory && state.categoryId != 0 && ( */}
        {state.searchOption.selectedCategory &&
          state.searchOption.categoryId != 0 && (
            <AnimatedButton
              style={styles.chip}
              onPress={async () => {
                actions.dispatchSearchOption({
                  type: 'SET_CATEGORY',
                  payload: {
                    categoryId: 0,
                    selectedCategory: '전체',
                    reset: 1,
                  },
                });
                // TODO: 주석 삭제
                // actions.setCategoryId(0);
                // actions.loadData();
              }}>
              <B12 customStyle={styles.chipText}>
                {state.searchOption.selectedCategory}
              </B12>
              <View
                style={{
                  marginLeft: 5,
                  alignSelf: 'auto',
                  paddingTop: 0.7,
                }}>
                <Close
                  width={10}
                  height={10}
                  stroke={COLOR_BLACK}
                  strokeWidth={3}
                  scale={10 / 24}
                />
              </View>
            </AnimatedButton>
          )}
        {/* //TODO: 주석 삭제 */}
        {/* {state.selectedRange !== null && state.selectedRange != '전체가격' && ( */}
        {state.searchOption.selectedRange !== null &&
          state.searchOption.selectedRange != '전체가격' && (
            <AnimatedButton
              style={styles.chip}
              onPress={async () => {
                actions.dispatchSearchOption({
                  type: 'SET_SELECTED_RANGE',
                  payload: {
                    selectedRange: '전체가격',
                    priceMin: 0,
                    priceMax: 999999999,
                    reset: 1,
                  },
                });
                //TODO: 주석 삭제
                // actions.setSelectedRange('전체가격');
                // actions.setPriceMin(0);
                // actions.setPriceMax(999999999);
                // actions.loadData();
              }}>
              <B12 customStyle={styles.chipText}>
                {state.searchOption.selectedRange}
              </B12>
              <View
                style={{
                  marginLeft: 5,
                  alignSelf: 'auto',
                  paddingTop: 0.7,
                }}>
                <Close
                  width={10}
                  height={10}
                  stroke={COLOR_BLACK}
                  strokeWidth={3}
                  scale={10 / 24}
                />
              </View>
            </AnimatedButton>
          )}
        {/* //TODO: 주석 삭제 */}
        {/* {state.selectedSort && state.selectedSort != '많은 판매' && ( */}
        {state.searchOption.selectedSort &&
          state.searchOption.selectedSort != '많은 판매' && (
            <AnimatedButton
              style={styles.chip}
              onPress={() => {
                actions.dispatchSearchOption({
                  type: 'SET_SORT',
                  payload: {
                    selectedSort: '많은 판매',
                    sortAttribute: 'sales_volume',
                    sortWay: 'DESC',
                    reset: 1,
                  },
                });
                //TODO: 주석 삭제
                // actions.setSortAttribute('sales_volume');
                // actions.setSortWay('DESC');
                // actions.setSelectedSort('많은 판매');
                // actions.loadData();
              }}>
              <B12 customStyle={styles.chipText}>
                {state.searchOption.selectedSort}
              </B12>
              <View
                style={{
                  marginLeft: 5,
                  alignSelf: 'auto',
                  paddingTop: 0.7,
                }}>
                <Close
                  width={10}
                  height={10}
                  stroke={COLOR_BLACK}
                  strokeWidth={3}
                  scale={10 / 24}
                />
              </View>
            </AnimatedButton>
          )}
        {state.searchOption.search && (
          <AnimatedButton
            style={styles.chip}
            onPress={() => {
              actions.dispatchSearchOption({
                type: 'SET_SEARCH',
                payload: {
                  search: null,
                  reset: 1,
                },
              });
              actions.setSearch('');
            }}>
            <B12 customStyle={styles.chipText}>{state.searchOption.search}</B12>
            <View
              style={{
                marginLeft: 5,
                alignSelf: 'auto',
                paddingTop: 0.7,
              }}>
              <Close
                width={10}
                height={10}
                stroke={COLOR_BLACK}
                strokeWidth={3}
                scale={10 / 24}
              />
            </View>
          </AnimatedButton>
        )}
        <AnimatedButton
          style={styles.filterIconContainer}
          onPress={() => {
            actions.dispatchSearchOption({
              type: 'RESET_ALL',
              payload: {
                reset: 1,
              },
            });

            // actions.loadData_reset();
          }}>
          <Refresh
            width={20}
            height={20}
            stroke={COLOR_BLACK}
            strokeWidth={1.2}
            scale={1.1}
          />
        </AnimatedButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: backgroundColor, // Semi-transparent white
    // paddingVertical: 4,
    // justifyContent: 'center',
    // paddingHorizontal: 15,
    // elevation: 1,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // paddingVertical: 8,
    // height: 40,
  },
  chip: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE, // Light gray background for chip
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    alignSelf: 'center',
  },
  chipText: {color: COLOR_BLACK},
  filterIconContainer: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default SelectedStateHeader;
