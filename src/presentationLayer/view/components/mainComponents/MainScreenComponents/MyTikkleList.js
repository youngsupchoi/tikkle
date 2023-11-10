import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import {windowHeight, windowWidth} from '../Global/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from '../Global/Colors/Colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {B, B17, M11, M17} from '../Global/Typography/Typography';
import CloseCircle from '../../assets/icons/CloseCircle';
import {SPACING_1, SPACING_2, SPACING_3} from '../Global/Spacing/BaseSpacing';
import AnimatedButton from '../Global/Buttons/AnimatedButton';

const MovingCircle = ({size, maxX, maxY, image, name, message, created_at}) => {
  const [modalVisible, setModalVisible] = useState(false); // useState is used instead of useSharedValue
  const translateX = useSharedValue(Math.random() * maxX);
  const translateY = useSharedValue(Math.random() * maxY);
  const scale = useSharedValue(0.8 + Math.random() * 0.4); // This will give a random scale between 0.8 to 1.2
  const touchStarted = useSharedValue(false);

  const animateCircle = () => {
    if (touchStarted.value) return;
    const randomDuration = 2000 + Math.random() * 3000;
    const randomDX = Math.random() * 50 - 25;
    const randomDY = Math.random() * 50 - 25;
    const randomScale = 0.3 + Math.random() * 0.7; // Random scale between 0.8 to 1.2

    translateX.value = withSpring(
      Math.min(Math.max(translateX.value + randomDX, 0), maxX - size),
      {damping: 0.5, stiffness: 0.5},
    );

    translateY.value = withSpring(
      Math.min(Math.max(translateY.value + randomDY, 0), maxY - size),
      {damping: 0.5, stiffness: 0.5},
    );

    scale.value = withSpring(randomScale);

    setTimeout(animateCircle, randomDuration);
  };

  useEffect(() => {
    animateCircle();
    return () => {
      // Stop the animation when the component unmounts
      cancelAnimation(translateX);
      cancelAnimation(translateY);
    };
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      touchStarted.value = true;
    },
    onActive: (event, ctx) => {
      translateX.value = Math.min(
        Math.max(event.translationX + ctx.startX, 0),
        maxX - size,
      );
      translateY.value = Math.min(
        Math.max(event.translationY + ctx.startY, 0),
        maxY - size,
      );
    },
    onEnd: _ => {
      translateX.value = withSpring(
        Math.min(Math.max(translateX.value, 0), maxX - size),
      );
      translateY.value = withSpring(
        Math.min(Math.max(translateY.value, 0), maxY - size),
      );
      touchStarted.value = false;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  const styles = StyleSheet.create({
    image: {
      width: size - 8,
      height: size - 8,
      borderRadius: (size - 8) / 2,
    },
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    circle: {
      borderColor: COLOR_PRIMARY,
      borderRadius: 100,
      borderWidth: 0.5,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: COLOR_WHITE,
      borderRadius: 24,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5,
      width: windowWidth * 0.8,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: COLOR_BLACK,
      fontSize: 16,
      fontFamily: B,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      // elevation: 2,
      width: 44,
      // backgroundColor: 'red',
      margin: SPACING_1 / 2,
    },
    textContainer: {
      margin: SPACING_3,
      marginTop: SPACING_1,
    },
    name: {
      marginBottom: SPACING_3,
    },
    message: {
      width: '100%',
      padding: SPACING_2,
      borderColor: COLOR_SEPARATOR,
      borderWidth: 1,
      borderRadius: 12,
    },
    created_at: {
      marginTop: SPACING_1,
      textAlign: 'right',
    },
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.circle, animatedStyles]}>
          <AnimatedButton onPress={() => setModalVisible(true)}>
            <Image source={{uri: image}} style={styles.image} />
          </AnimatedButton>
        </Animated.View>
      </PanGestureHandler>
      <Modal
        avoidKeyboard
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AnimatedButton
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}>
              <CloseCircle
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={1.5}
              />
            </AnimatedButton>
            <View style={styles.textContainer}>
              <B17 customStyle={styles.name}>{name}님이 보낸 티클</B17>
              <M17 customStyle={styles.message}>{message}</M17>
              <M11 customStyle={styles.created_at}>{created_at}</M11>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CircleAnimation = ({myTikklingData}) => {
  // destructured myTikklingData from props
  return (
    <View style={styles.container}>
      {myTikklingData.length > 1 ? (
        myTikklingData.map((tikkle, index) => (
          <MovingCircle
            key={index}
            size={64}
            maxX={windowWidth}
            maxY={windowHeight - 300}
            image={
              tikkle.image !== null // used tikkle.image here instead of myTikklingData.image
                ? tikkle.image
                : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg'
            }
            name={tikkle.name}
            message={tikkle.message}
            created_at={tikkle.created_at}
          />
        ))
      ) : (
        <MovingCircle
          size={64}
          maxX={windowWidth}
          maxY={windowHeight - 300}
          image={
            myTikklingData[0].image !== null // used myTikklingData[0].image here instead of myTikklingData[0].image
              ? myTikklingData[0].image
              : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg'
          }
          name={myTikklingData[0].name}
          message={myTikklingData[0].message}
          created_at={myTikklingData[0].created_at}
        />
      )}
      {/* {console.log(myTikklingData[0])} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleAnimation;
