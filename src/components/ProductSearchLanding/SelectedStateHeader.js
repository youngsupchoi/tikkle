import React from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {B12} from '../Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../Global/Colors/Colors';
import AnimatedButton from '../Global/Buttons/AnimatedButton';

const SelectedStateHeader = ({
  scrollY,
  selectedCategory,
  selectedRange,
  selectedSort,
  search,
}) => {
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          opacity: headerOpacity,
          transform: [{translateY: headerTranslateY}],
        },
      ]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedCategory && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{selectedCategory}</B12>
          </AnimatedButton>
        )}
        {selectedRange !== null && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{selectedRange}</B12>
          </AnimatedButton>
        )}
        {selectedSort && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{selectedSort}</B12>
          </AnimatedButton>
        )}
        {search && (
          <AnimatedButton style={styles.chip}>
            <B12 customStyle={styles.chipText}>{search}</B12>
          </AnimatedButton>
        )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: backgroundColor, // Semi-transparent white
    paddingVertical: 4,
    justifyContent: 'center',
    paddingHorizontal: 15,
    elevation: 1,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLOR_WHITE, // Light gray background for chip
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
  },
  chipText: {color: COLOR_BLACK},
});

export default SelectedStateHeader;
