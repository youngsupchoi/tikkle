import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
  COLOR_BLACK,
  COLOR_GRAY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
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
    <View style={{marginHorizontal: 24, marginTop: 24}}>
      <View style={styles.headerContainer}>
        <B17>id 변경</B17>
        <AnimatedButton
          style={{paddingRight: 50}}
          onPress={() => actions.changeNick()}>
          <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
        </AnimatedButton>
      </View>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: COLOR_WHITE,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={`${state.userData_profile.nick}`}
          placeholderTextColor={COLOR_GRAY}
          style={{
            fontFamily: B,
            fontSize: 17,
            padding: 12,
            paddingHorizontal: 16,
            color: COLOR_BLACK,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
