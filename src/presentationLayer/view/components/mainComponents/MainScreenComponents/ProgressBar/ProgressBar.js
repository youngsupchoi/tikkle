import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import LinearGradient from 'react-native-linear-gradient';

const BarComponent = ({totalPieces, gatheredPieces}) => {
  // Calculate the percentage of pieces gathered
  const percentageGathered = (gatheredPieces / totalPieces) * 100;

  return (
    <View style={styles.barContainer}>
      <View style={[styles.bar, styles.totalBar]} />
      <LinearGradient
        colors={['#9C88FF', '#8A3DFF', '#6A0DAD']}
        style={[
          styles.bar,
          styles.gatheredBar,
          {width: `${percentageGathered}%`},
        ]}
        start={{x: 0, y: 0.8}}
        end={{x: 1, y: 0.2}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    // height: 30,
    // backgroundColor: 'red',
    overflow: 'hidden',
    alignItems: 'flex-end',
    // marginTop: SPACING_2,
    width: '100%',
  },
  bar: {
    height: 8,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    backgroundColor: COLOR_BLACK,
    borderRadius: 4,
  },
  totalBar: {
    backgroundColor: COLOR_SEPARATOR,
    height: 8,
    width: '100%',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    position: 'absolute',
    zIndex: -1,
  },
  gatheredBar: {
    backgroundColor: COLOR_PRIMARY,
    zIndex: 1,
  },
  totalPieces: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: COLOR_GRAY,
  },
  gatheredPieces: {
    position: 'absolute',
    top: 0,
    color: COLOR_GRAY,
  },
});

export default BarComponent;