import {Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {textColor} from '../Colors/Colors';

//export const UNIQUE = 'Modak';

export const UNIQUE = Platform.OS === 'ios' ? 'Modak' : 'Modak-Regular';
export const CHRISTMAS_TITLE =
  Platform.OS === 'ios' ? 'BlackHanSans-Regular' : 'BlackHanSans-Regular';
export const NUMBERFONT =
  Platform.OS === 'ios' ? 'BebasNeue-Regular' : 'BebasNeue-Regular';

export const H =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoH00' : 'AppleSDGothicNeoH';
export const EB =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoEB00' : 'AppleSDGothicNeoEB';
export const B =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoB00' : 'AppleSDGothicNeoB';
export const SB =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoSB00' : 'AppleSDGothicNeoSB';
export const M =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoM00' : 'AppleSDGothicNeoM';
export const R =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoR00' : 'AppleSDGothicNeoR';
export const T =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoT00' : 'AppleSDGothicNeoT';
export const L =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoL00' : 'AppleSDGothicNeoL';
export const UL =
  Platform.OS === 'ios' ? 'AppleSDGothicNeoUL00' : 'AppleSDGothicNeoUL';

export const CHRISTMAS_TILE24 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.CHRISTMAS_TITLE24, customStyle]}>
      {children}
    </Text>
  );
};
export const CHRISTMAS_TILE32 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.CHRISTMAS_TITLE32, customStyle]}>
      {children}
    </Text>
  );
};
export const UNIQUE22 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.UNIQUE22, customStyle]}>
      {children}
    </Text>
  );
};
export const UNIQUE27 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.UNIQUE27, customStyle]}>
      {children}
    </Text>
  );
};
export const UNIQUE34 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.UNIQUE34, customStyle]}>
      {children}
    </Text>
  );
};

export const UNIQUE50 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.UNIQUE50, customStyle]}>
      {children}
    </Text>
  );
};

export const EB34 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB34, customStyle]}>
      {children}
    </Text>
  );
};
export const EB28 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB28, customStyle]}>
      {children}
    </Text>
  );
};
export const EB22 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB22, customStyle]}>
      {children}
    </Text>
  );
};
export const EB20 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB20, customStyle]}>
      {children}
    </Text>
  );
};
export const EB17 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB17, customStyle]}>
      {children}
    </Text>
  );
};
export const EB15 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.EB15, customStyle]}>
      {children}
    </Text>
  );
};

export const B34 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B34, customStyle]}>
      {children}
    </Text>
  );
};
export const B28 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B28, customStyle]}>
      {children}
    </Text>
  );
};
export const B22 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B22, customStyle]}>
      {children}
    </Text>
  );
};
export const B20 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B20, customStyle]}>
      {children}
    </Text>
  );
};
export const B17 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B17, customStyle]}>
      {children}
    </Text>
  );
};
export const B15 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B15, customStyle]}>
      {children}
    </Text>
  );
};
export const B12 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.B12, customStyle]}>
      {children}
    </Text>
  );
};

export const M34 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M34, customStyle]}>
      {children}
    </Text>
  );
};
export const M28 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M28, customStyle]}>
      {children}
    </Text>
  );
};
export const M22 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M22, customStyle]}>
      {children}
    </Text>
  );
};
export const M20 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M20, customStyle]}>
      {children}
    </Text>
  );
};
export const M17 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M17, customStyle]}>
      {children}
    </Text>
  );
};
export const M15 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M15, customStyle]}>
      {children}
    </Text>
  );
};
export const M11 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.M11, customStyle]}>
      {children}
    </Text>
  );
};

export const H1 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.h1, customStyle]}>
      {children}
    </Text>
  );
};
export const H2 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.h2, customStyle]}>
      {children}
    </Text>
  );
};
export const H3 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.h3, customStyle]}>
      {children}
    </Text>
  );
};
export const T34 = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.t34, customStyle]}>
      {children}
    </Text>
  );
};
export const Body = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.body, customStyle]}>
      {children}
    </Text>
  );
};
export const Caption = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.caption, customStyle]}>
      {children}
    </Text>
  );
};
export const Button = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.button, customStyle]}>
      {children}
    </Text>
  );
};
export const Label = ({
  children,
  customStyle,
  ellipsizeMode = 'tail',
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.label, customStyle]}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  UNIQUE34: {
    flexWrap: 'wrap',
    fontFamily: UNIQUE,
    color: textColor,
    fontSize: 34,
    lineHeight: 41,
  },
  UNIQUE50: {
    flexWrap: 'wrap',
    fontFamily: UNIQUE,
    color: textColor,
    fontSize: 50,
    lineHeight: 60,
  },
  UNIQUE27: {
    flexWrap: 'wrap',
    fontFamily: UNIQUE,
    color: textColor,
    fontSize: 27,
  },
  UNIQUE22: {
    flexWrap: 'wrap',
    fontFamily: UNIQUE,
    color: textColor,
    fontSize: 22,
    lineHeight: 28,
  },
  CHRISTMAS_TITLE24: {
    flexWrap: 'wrap',
    fontFamily: CHRISTMAS_TITLE,
    color: textColor,
    fontSize: 24,
  },
  CHRISTMAS_TITLE32: {
    flexWrap: 'wrap',
    fontFamily: CHRISTMAS_TITLE,
    color: textColor,
    fontSize: 32,
  },
  EB34: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 34,
    lineHeight: 41,
  },
  EB28: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 28,
    lineHeight: 34,
  },
  EB22: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 22,
    lineHeight: 28,
  },
  EB20: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 20,
    lineHeight: 25,
  },
  EB17: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 17,
    lineHeight: 22,
  },
  EB15: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 15,
    lineHeight: 22,
  },
  B34: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 34,
    lineHeight: 41,
  },
  B28: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 28,
    lineHeight: 34,
  },
  B22: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 22,
    lineHeight: 28,
  },
  B20: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 20,
    lineHeight: 25,
  },
  B17: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 17,
    lineHeight: 22,
  },
  B15: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 15,
    lineHeight: 22,
  },
  B12: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 12,
    lineHeight: 16,
  },
  M34: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 34,
    lineHeight: 41,
  },
  M28: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 28,
    lineHeight: 34,
  },
  M22: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 22,
    lineHeight: 28,
  },
  M20: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 20,
    lineHeight: 25,
  },
  M17: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 17,
    lineHeight: 22,
  },
  M15: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 15,
    lineHeight: 22,
  },
  M11: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 11,
    lineHeight: 13,
  },
  h1: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    flexWrap: 'wrap',
    fontFamily: EB,
    color: textColor,
    fontSize: 24,
    lineHeight: 30,
  },
  h3: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 20,
    lineHeight: 26,
  },
  body: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 12,
    lineHeight: 16,
    color: '#888',
  },
  button: {
    flexWrap: 'wrap',
    fontFamily: B,
    color: textColor,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    flexWrap: 'wrap',
    fontFamily: M,
    color: textColor,
    fontSize: 14,
    lineHeight: 20,
  },
  t34: {
    flexWrap: 'wrap',
    fontFamily: T,
    color: textColor,
    fontSize: 34,
    lineHeight: 41,
  },
});
