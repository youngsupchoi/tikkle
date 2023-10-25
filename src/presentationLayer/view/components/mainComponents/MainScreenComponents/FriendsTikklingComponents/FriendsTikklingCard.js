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
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../Global/Colors/Colors';
import {B12, M11} from '../../Global/Typography/Typography';
import GaugeProgress from './GaugeProgress';
import {SPACING_1, SPACING_6} from '../../Global/Spacing/BaseSpacing';
import TimerComponent from './HomeTimer';

const FriendsTikklingCard = forwardRef(({data}, ref) => {
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
        rotateX.value = withSpring(180);
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
          <Image
            source={{uri: data.thumbnail_image}}
            style={styles.smallImage}
          />
        </Animated.View>
        <Animated.View
          ref={ref}
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <View style={styles.backCardHeaderContainer}>
            <View style={styles.backCardHeaderItem}>
              <M11 customStyle={{color: backgroundColor}}>총 조각</M11>
              <B12 customStyle={{color: backgroundColor}}>
                {data.tikkle_quantity}
              </B12>
            </View>
            <View style={styles.separator} />
            <View style={styles.backCardHeaderItem}>
              <M11 customStyle={{color: backgroundColor}}>현재 조각</M11>
              <B12 customStyle={{color: backgroundColor}}>
                {data.tikkle_count}
              </B12>
            </View>
            <View style={styles.separator} />
            <View style={styles.backCardHeaderItem}>
              <View style={styles.gaugeContainer}>
                <GaugeProgress
                  totalPieces={data.tikkle_quantity}
                  gatheredPieces={data.tikkle_count}
                />
              </View>
            </View>
          </View>

          <View style={[styles.timerContainer]}>
            <TimerComponent deadline={data.funding_limit} />
          </View>
          {/* <View style={styles.backCardBodyContainer}>
            <View>
              <M11>{data.brand}</M11>
              <B12>{data.productName}</B12>
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
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
  },
  flipCard: {
    // backgroundColor: 'red',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
  },
  backCardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 40,
    backgroundColor: COLOR_BLACK,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  backCardHeaderItem: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    height: '40%',
    backgroundColor: COLOR_SEPARATOR,
  },
  backCardBodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING_1,
    marginBottom: 0,
    borderRadius: 12,
    padding: SPACING_1 / 2,
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
    marginBottom: SPACING_1,
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
    top: 40,
    bottom: 0,
    paddingHorizontal: SPACING_6,
    justifyContent: 'center', // This will center children vertically inside timerContainer
    alignItems: 'center', // This will center children horizontally inside timerContainer
  },
});

export default FriendsTikklingCard;
