import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  SPACING_1,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {B20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Male from 'src/assets/icons/Male';
import Female from 'src/assets/icons/Female';

export default function GenderInput() {
  const {ref, state, actions} = useStartViewModel();
  return (
    <View style={styles.inputContainer}>
      <AnimatedButton
        onPress={() => {
          actions.setGender('남성');
        }}
        style={[
          styles.button,
          {
            backgroundColor:
              state.gender === '남성' ? COLOR_PRIMARY : backgroundColor,
          },
        ]}>
        <Male
          fill={state.gender === '남성' ? backgroundColor : COLOR_PRIMARY}
        />
        <B20
          customStyle={{
            marginTop: 8,
            color: state.gender === '남성' ? backgroundColor : COLOR_PRIMARY,
          }}>
          남성
        </B20>
      </AnimatedButton>
      <AnimatedButton
        onPress={() => {
          actions.setGender('여성');
        }}
        style={[
          styles.button,
          {
            backgroundColor:
              state.gender === '여성' ? COLOR_PRIMARY : backgroundColor,
          },
        ]}>
        <Female
          fill={state.gender === '여성' ? backgroundColor : COLOR_PRIMARY}
        />
        <B20
          customStyle={{
            marginTop: 8,
            color: state.gender === '여성' ? backgroundColor : COLOR_PRIMARY,
          }}>
          여성
        </B20>
      </AnimatedButton>
      <AnimatedButton
        onPress={() => {
          actions.setGender('기타');
        }}
        style={[
          styles.button,
          {
            backgroundColor:
              state.gender === '기타' ? COLOR_PRIMARY : backgroundColor,
          },
        ]}>
        <View style={{width: 24, height: 24}} />
        <B20
          customStyle={{
            marginTop: 8,
            color: state.gender === '기타' ? backgroundColor : COLOR_PRIMARY,
          }}>
          기타
        </B20>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: windowWidth - 32,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: backgroundColor,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING_1,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
});
