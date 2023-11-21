import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  B,
  B12,
  B15,
  B17,
  B20,
  M11,
  M15,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowHeight} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import DeleteUserModal from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/DeleteUserModal';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

export default function CustomerCenterScreen() {
  const {ref, state, actions} = useMyPageViewModel();
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();

  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton
            onPress={() => navigation.goBack()}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              // elevation: 1,
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
              <B17>고객 센터</B17>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: 400}}>
        <View style={{marginTop: 24}}>
          <AnimatedButton
            onPress={() => {
              actions.contractLink();
            }}
            style={styles.buttonStyle}>
            <B15 customStyle={styles.buttonText}>서비스 이용 약관</B15>
          </AnimatedButton>
        </View>

        <View style={{marginTop: 24}}>
          <AnimatedButton
            onPress={() => {
              actions.privateDataLink();
            }}
            style={styles.buttonStyle}>
            <B15 customStyle={styles.buttonText}>개인정보 처리 방침</B15>
          </AnimatedButton>
        </View>

        <View style={{marginTop: 24}}>
          <AnimatedButton
            onPress={() => {
              navigation.navigate('Inquire');
            }}
            style={styles.buttonStyle}>
            <B15 customStyle={styles.buttonText}>문의</B15>
          </AnimatedButton>
        </View>

        <View style={{marginTop: 24}}>
          <AnimatedButton
            onPress={() => {
              actions.setUserDeleteModal(true);
            }}
            style={styles.buttonStyle}>
            <B15 customStyle={styles.buttonText}>회원 탈퇴</B15>
          </AnimatedButton>
        </View>
      </View>
      <DeleteUserModal />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: backgroundColor,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
    backgroundColor: backgroundColor,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
  },
  small_header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 6,
    // height: HEADER_HEIGHT,
  },
  buttonStyle: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    paddingVertical: 16,
  },
  buttonText: {
    color: COLOR_PRIMARY,
    fontFamily: EB,
  },
});
