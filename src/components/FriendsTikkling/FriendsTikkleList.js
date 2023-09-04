import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {windowHeight, windowWidth} from '../Global/Containers/MainContainer';

const MovingCircle = ({size, maxX, maxY, profileImage}) => {
  const positionX = useSharedValue(Math.random() * maxX);
  const positionY = useSharedValue(Math.random() * maxY);

  useEffect(() => {
    const animateCircle = () => {
      const randomDuration = 1000 + Math.random() * 500;
      const randomDX = Math.random() * 20 - 10;
      const randomDY = Math.random() * 20 - 10;

      positionX.value = withTiming(
        Math.min(Math.max(positionX.value + randomDX, 0), maxX - size),
        {
          duration: randomDuration,
          easing: Easing.inOut(Easing.quad),
        },
      );

      positionY.value = withTiming(
        Math.min(Math.max(positionY.value + randomDY, 0), maxY - size),
        {
          duration: randomDuration,
          easing: Easing.inOut(Easing.quad),
        },
      );

      setTimeout(() => {
        // Recursive call to create a freewheeling motion
        animateCircle();
      }, randomDuration);
    };

    animateCircle();

    return () => {
      // Stop the animation when the component unmounts
      positionX.value = withTiming(positionX.value);
      positionY.value = withTiming(positionY.value);
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: positionX.value}, {translateY: positionY.value}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyles,
      ]}>
      <Image
        source={{uri: profileImage !== null ? profileImage : ''}}
        style={{
          width: size - 8, // Subtract some margin
          height: size - 8, // Subtract some margin
          borderRadius: (size - 8) / 2,
        }}
      />
    </Animated.View>
  );
};

const FriendsTikkleList = friendsTikkleData => {
  return (
    <View style={styles.container}>
      {Array.from({length: 10}).map((_, index) => (
        <MovingCircle
          key={index}
          size={36}
          maxX={windowWidth}
          maxY={windowHeight - 200}
          profileImage={
            friendsTikkleData.profileImage !== ''
              ? friendsTikkleData.profileImage
              : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg'
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    position: 'relative',
  },
  circle: {
    backgroundColor: 'blue',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendsTikkleList;
