import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  backgroundColor,
} from '../../Global/Colors/Colors';

const GaugeProgress = ({
  gatheredPieces,
  totalPieces,
  size = 20,
  strokeWidth = 2,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = gatheredPieces / totalPieces;
  const dashOffset = circumference * (1 - percentage);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={backgroundColor} // Change this to your desired background color
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={COLOR_PRIMARY} // Change this to your desired foreground color
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: COLOR_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  overlayHalfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: COLOR_GRAY,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  overlayFullCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_GRAY,
    borderRadius: 100,
  },
});

export default GaugeProgress;
