import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_SUCCESS,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export default function EditNickname() {
  const {ref, state, actions} = useMyPageViewModel();
  return (
    <View style={{padding: 24, paddingBottom: 10}}>
      <View style={styles.headerContainer}>
        <B15>닉네임 변경</B15>
        <AnimatedButton
          style={{paddingRight: 50}}
          onPress={() => actions.changeNick()}>
          <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
        </AnimatedButton>
      </View>
      <View
        style={{
          borderRadius: 4,
          backgroundColor: COLOR_WHITE,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={`${state.userData_profile.nick}`}
          style={{
            fontFamily: B,
            fontSize: 17,
            width: '80%',
            padding: 12,
            paddingHorizontal: 16,
          }}
          onChangeText={value => actions.setNewNick(value)}
          value={state.newNick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: HEADER_HEIGHT,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
});
