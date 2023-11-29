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
        {state.selectedCategory && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{state.selectedCategory}</B12>
          </AnimatedButton>
        )}
        {state.selectedRange !== null && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{state.selectedRange}</B12>
          </AnimatedButton>
        )}
        {state.selectedSort && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{state.selectedSort}</B12>
          </AnimatedButton>
        )}
        {state.search && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{state.search}</B12>
          </AnimatedButton>
        )}
        <AnimatedButton
          style={styles.filterIconContainer}
          onPress={() => {
            actions.loadData_reset();
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE, // Light gray background for chip
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
