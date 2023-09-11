import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

const MyTikklingComponent = () => {
  const {ref, state, actions} = useMainViewModel();
  const {dropdownAnimation} = ref;
  const dropdownStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        translateY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  return (
    <View
      style={{
        marginVertical: 12,
        backgroundColor: COLOR_WHITE,
        borderRadius: 24,
      }}>
      <View
        style={{
          padding: 24,
          paddingTop: 16,
          paddingBottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <B20 customStyle={{fontFamily: EB}}>내 티클링</B20>
        <AnimatedButton
          onPress={() => {
            if (state.dropdownVisible) {
              actions.hideDropdown();
            } else {
              actions.showDropdown();
            }
          }}
          style={{padding: 10}}>
          <Detail
            width={20}
            height={20}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1}
          />
        </AnimatedButton>
        {state.dropdownVisible && (
          <Animated.View
            style={[
              dropdownStyle,
              {
                backgroundColor: COLOR_WHITE,
                position: 'absolute',
                top: 16 + 40,
                right: 24,
                zIndex: 2,
                borderRadius: 12,
                elevation: 10,
              },
            ]}>
            <AnimatedButton
              onPress={() => {
                actions.buttonPress();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                paddingVertical: 12,
              }}>
              <View style={{}}>
                <Delete
                  width={24}
                  height={24}
                  stroke={COLOR_ERROR}
                  strokeWidth={1.5}
                  scale={1}
                />
              </View>
              <B15 customStyle={{color: COLOR_ERROR, paddingLeft: 12}}>
                종료하기
              </B15>
            </AnimatedButton>
          </Animated.View>
        )}
      </View>
      {state.myTikklingData.length === 0 ? null : (
        <FirstHero
          navigation={navigation}
          myTikklingData={state.myTikklingData}
          setVisible={actions.setVisible}
          userData={state.userData}
          put_tikkling_end={put_tikkling_end}
          put_tikkling_cancel={put_tikkling_cancel}
        />
      )}
      {/* {console.log('myTikklingData', state.myTikklingData)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  myTikklingContainer: {
    marginTop: SPACING_2,
    marginHorizontal: SPACING_2,
    borderRadius: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: SPACING_2,
  },
  // ... (Other related styles)
});

export default MyTikklingComponent;
