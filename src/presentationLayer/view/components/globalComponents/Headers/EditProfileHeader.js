import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SUCCESS,
  COLOR_WHITE,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B15,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

import Notification from 'src/assets/icons/Notification.js';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft2 from 'src/assets/icons/ArrowLeft2';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';

export default function EditProfileHeader() {
  const {state, actions} = useMyPageViewModel();
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AnimatedButton
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 10}}>
          <ArrowLeft2
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
          />
        </AnimatedButton>
        <B20 customStyle={{marginLeft: 4}}>프로필 수정</B20>
      </View>
      <AnimatedButton
        style={styles.filterIconContainer}
        onPress={() => {
          actions.editRefresh();
        }}>
        <Refresh
          width={20}
          height={20}
          stroke={COLOR_BLACK}
          strokeWidth={1.2}
          scale={1.1}
        />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: HEADER_HEIGHT + StatusBarHeight,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: SPACING_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  filterIconContainer: {
    backgroundColor: 'transparent',
    borderColor: backgroundColor,
    borderWidth: 0.5,
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
});
