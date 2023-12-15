import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function SignUpHeader() {
  const {ref, state, actions} = useStartViewModel();
  const PaginationComponent = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.selectedPagination} />
        <View style={styles.pagination} />
        <View style={styles.pagination} />
        {/* <View style={styles.pagination} /> */}
      </View>
    );
  };
  return (
    <View style={styles.signUpHeader}>
      <AnimatedButton
        /* onPress={actions.handleBackPress} */
        style={{...styles.backButton, opacity: 0, pointerEvents: 'none'}}>
        <BackIcon width={24} height={24} stroke={COLOR_BLACK} strokeWidth={1} />
      </AnimatedButton>
      <PaginationComponent />
      <View style={{width: 44}} />
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: SPACING_2,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    marginBottom: SPACING_4,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    backgroundColor: COLOR_GRAY,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  selectedPagination: {
    backgroundColor: COLOR_BLACK,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
});
