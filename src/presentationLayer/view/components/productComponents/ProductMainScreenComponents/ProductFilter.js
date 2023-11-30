import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  B,
  B12,
  B15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ProductSearchChips from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearchChips';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Modal from 'react-native-modal';

export default function ProductFilter() {
  const {state, actions} = useProductMainViewModel();

  const priceRanges = [
    {label: '전체가격', min: 0, max: null},
    {label: '0~5만원', min: 0, max: 50000},
    {label: '5만~10만', min: 50000, max: 100000},
    {label: '10만~20만', min: 100000, max: 200000},
    {label: '20만~30만', min: 200000, max: 300000},
    {label: '30만~50만', min: 300000, max: 500000},
    {label: '50만~100만', min: 500000, max: 1000000},
    {label: '100만 이상', min: 1000000, max: 999999999},
  ];
  return (
    <View style={styles.filterContainer}>
      <Modal
        avoidKeyboard
        // onSwipeComplete={() => actions.setShowFilter(false)}
        // swipeDirection={'down'}
        onBackButtonPress={() => actions.setShowFilter(false)}
        onBackdropPress={() => actions.setShowFilter(false)}
        isVisible={state.showFilter}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={styles.modalContent}>
          <B15>가격</B15>
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
      </Modal>
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
    paddingHorizontal: 12,
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
    // marginTop: 16,
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
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
