import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_1,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {M11} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

const SmallBarComponent = ({totalPieces, gatheredPieces}) => {
  // Calculate the percentage of pieces gathered
  const percentageGathered = (gatheredPieces / totalPieces) * 100;

  return (
    <View style={styles.barContainer}>
      {/* Layer 1: Total number of pieces */}
      <View style={[styles.bar, styles.totalBar]} />

      {/* Layer 2: Number of pieces gathered */}
      <View
        style={[
          styles.bar,
          styles.gatheredBar,
          {width: `${percentageGathered}%`},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: SPACING_1,
    width: '100%',
  },
  bar: {
    height: 8,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    backgroundColor: COLOR_SEPARATOR,
  },
  totalBar: {
    backgroundColor: COLOR_SEPARATOR,
  },
  gatheredBar: {
    backgroundColor: COLOR_PRIMARY,
  },
});

export default SmallBarComponent;
