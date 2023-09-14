import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  B,
  B17,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';

export default function SendTikkleScreenHeader() {
  const {ref, state, actions} = useMyPageViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton
            onPress={() => actions.navigation.goBack()}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
            }}>
            <ArrowLeft
              stroke={COLOR_BLACK}
              width={20}
              height={20}
              strokeWidth={1.5}
              scale={0.85}
            />
          </AnimatedButton>
          <View style={styles.small_header}>
            <View>
              <B17>보낸 티클 내역</B17>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flex: 1,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
  },
  small_header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 6,
    // height: HEADER_HEIGHT,
  },
  titleBox: {
    marginTop: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth - 32,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  contentBox: {
    marginTop: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    height: 450,
    width: windowWidth - 32,
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  searchText: {
    color: COLOR_BLACK,
    marginLeft: 12,
    padding: 0,
    fontFamily: B,
    fontSize: 15,
  },
  buttonStyle: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});
