import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
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
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export default function InquireScreen() {
  const {ref, state, actions} = useMyPageViewModel();
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: backgroundColor}}
      behavior="padding"
      enabled
      keyboardVerticalOffset={0}>
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
                <B17>문의 작성</B17>
              </View>
            </View>
          </View>
        </View>
        {state.inquireLoading ? (
          <GlobalLoader />
        ) : (
          <View>
            <View style={styles.small_header}>
              <View>
                <B17>제목</B17>
              </View>
            </View>

            <View style={styles.titleBox}>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="문의 제목을 입력해주세요."
                  placeholderTextColor={COLOR_GRAY}
                  onChangeText={value => actions.setTitleText(value)}
                  value={state.titleText}
                  style={{lineHeight: 36}}
                />
              </View>
            </View>

            <View style={styles.small_header}>
              <View>
                <B17>문의 내용</B17>
              </View>
            </View>

            <View style={styles.contentBox}>
              <View style={styles.searchBar}>
                <TextInput
                  multiline={true}
                  placeholder="문의 내용을 입력해주세요."
                  placeholderTextColor={COLOR_GRAY}
                  onChangeText={value => actions.setContentText(value)}
                  value={state.contentText}
                  style={{lineHeight: 32}}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 24, left: 16, right: 16}}>
        <AnimatedButton
          onPress={() => {
            console.log('Title : ', state.titleText);
            console.log('Content : ', state.contentText);
            actions.sendMail();
          }}
          style={styles.buttonStyle}>
          <B15 customStyle={styles.buttonText}>문의 메일 전송하기</B15>
        </AnimatedButton>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 12,
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
    width: windowWidth - 32,
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 16,
    paddingTop: 0,
    // paddingHorizontal: 12,
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
