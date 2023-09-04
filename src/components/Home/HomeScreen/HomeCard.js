import React, {forwardRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECOND_BLACK,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../Global/Colors/Colors';
import {
  B12,
  B15,
  B17,
  B22,
  B28,
  M15,
  M17,
  M20,
} from '../../Global/Typography/Typography';
import GaugeProgress from './GaugeProgress';
import {
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_6,
} from '../../Global/Spacing/BaseSpacing';
import TimerComponent from '../Timer/HomeTimer';

const HomeCard = forwardRef(({data}, ref) => {
  const imageSource = data.wishlistImage !== null ? data.wishlistImage : '';
  const rotateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = rotateX.value;
    },
    onActive: (event, ctx) => {
      rotateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event, ctx) => {
      if (event.translationX > 50) {
        rotateX.value = withSpring(180); // Change this to 360 for a full rotation
      } else {
        rotateX.value = withSpring(0);
      }
    },
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotateX.value}deg`}],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotateX.value + 180}deg`}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={{flex: 1}}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Image source={{uri: imageSource}} style={styles.smallImage} />
        </Animated.View>
        <Animated.View
          ref={ref}
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <View style={styles.backCardHeaderContainer}>
            <View style={styles.backCardHeaderItem}>
              <B12 customStyle={{color: COLOR_BLACK, marginRight: 8}}>총</B12>
              <View style={styles.count}>
                <M15 customStyle={{color: COLOR_BLACK}}>{data.totalPieces}</M15>
              </View>
            </View>
            {/* <View style={styles.separator} /> */}
            <View style={styles.backCardHeaderItem}>
              <B12 customStyle={{color: COLOR_BLACK, marginRight: 8}}>현재</B12>
              <View style={styles.count}>
                <M15 customStyle={{color: COLOR_BLACK}}>
                  {data.gatheredPieces}
                </M15>
              </View>
            </View>
            {/* <View style={styles.separator} /> */}
            <View style={styles.backCardHeaderItem}>
              <View style={styles.gaugeContainer}>
                <GaugeProgress
                  totalPieces={data.totalPieces}
                  gatheredPieces={data.gatheredPieces}
                />
              </View>
            </View>
          </View>

          <View style={[styles.timerContainer]}>
            <TimerComponent deadline={data.deadline} />
          </View>
          {/* <View style={styles.backCardBodyContainer}>
            <View>
              <M15>{data.brand}</M15>
              <B22>{data.productName}</B22>
            </View>
          </View> */}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
});

const styles = StyleSheet.create({
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  flipCard: {
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    backfaceVisibility: 'hidden',
    borderWidth: 0.5,
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR_WHITE,
    backfaceVisibility: 'hidden',
    borderRadius: 12,
  },
  backCardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,
    backgroundColor: COLOR_SEPARATOR,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  backCardHeaderItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  gaugeContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 2,
    height: '40%',
    backgroundColor: COLOR_SEPARATOR,
  },
  backCardBodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: COLOR_SEPARATOR,
    // borderWidth: .5,
    margin: SPACING_2,
    marginBottom: 0,
    borderRadius: 12,
    padding: SPACING_1,
    // shadowColor: '#323247',
    // shadowRadius: 0,
    // elevation: 3,
    // backgroundColor: backgroundColor,
    position: 'absolute',
    bottom: SPACING_1,
    left: 0,
    right: 0,
  },
  percentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING_2,
  },
  footerContainer: {},
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  timerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    paddingHorizontal: SPACING_6,
    justifyContent: 'center', // This will center children vertically inside timerContainer
    alignItems: 'center', // This will center children horizontally inside timerContainer
  },
  count: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLOR_SECOND_SEPARATOR,
    borderRadius: 6,
  },
});

export default HomeCard;
