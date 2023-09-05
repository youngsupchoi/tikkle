import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Refresh from '../../assets/icons/Refresh';
import {SPACING_1, SPACING_2} from '../Global/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../Global/Colors/Colors';
import {windowWidth} from '../Global/Containers/MainContainer';
import {B, B15, B17, M, M11, M15} from '../Global/Typography/Typography';
import SearchNormal1 from '../../assets/icons/SearchNormal1';
import AnimatedButton from '../Global/Buttons/AnimatedButton';

export default function FriendsManagementSearch1(props) {
  const {text, setText, selected, get_friend_search} = props;

  const onSearchButtonPressed = () => {
    get_friend_search();
  };
  return (
    <View style={styles.searchContainer}>
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          // marginHorizontal: 24,
          alignSelf: 'center',
          width: windowWidth - 32,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            borderRadius: 12,
            borderColor: COLOR_SEPARATOR,
            borderWidth: 1,
            padding: 8,
            paddingHorizontal: 12,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginHorizontal: 24,
            // alignItems: 'flex-start',
          }}>
          <TextInput
            onSubmitEditing={onSearchButtonPressed}
            placeholder="아이디로 이용자 검색"
            placeholderTextColor={COLOR_GRAY}
            onChangeText={value => setText(value)}
            value={text}
            style={{
              color: COLOR_BLACK,
              marginLeft: 12,
              padding: 0,
              fontFamily: B,
              fontSize: 15,
            }}
          />
          <AnimatedButton
            onPress={onSearchButtonPressed()}
            style={{
              alignSelf: 'center',
              padding: 4,
              alignItems: 'center',
            }}>
            <SearchNormal1
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              scale={1}
              strokeWidth={1.5}
            />
          </AnimatedButton>
          {/* <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
            아이디로 이용자 검색
          </B15> */}
        </View>
      </View>
      {/* <View style={styles.searchBar}>
        <TextInput
          onSubmitEditing={onSearchButtonPressed}
          placeholder="아이디로 이용자 검색"
          placeholderTextColor={COLOR_GRAY}
          onChangeText={value => setText(value)}
          value={text}
          style={styles.text}
        />
      </View>
      <AnimatedButton
        onPress={onSearchButtonPressed}
        style={styles.refreshButton}>
        <SearchNormal1
          width={20}
          height={20}
          stroke={COLOR_BLACK}
          strokeWidth={1.2}
          scale={1.1}
        />
      </AnimatedButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: SPACING_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: backgroundColor,
    paddingHorizontal: SPACING_2,
  },
  refreshButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: COLOR_SEPARATOR,
    backgroundColor: COLOR_WHITE,
    borderWidth: 0.5,
    width: 44,
    height: 44,
    elevation: 1,
  },
  searchBar: {
    paddingHorizontal: SPACING_2,
    // paddingVertical: SPACING_1,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    alignItems: 'center',
    width: windowWidth - 82,
    elevation: 1,
    height: 44,
  },
  searchIconContainer: {
    marginRight: 8,
    alignItems: 'center',
  },
  text: {
    color: COLOR_BLACK,
    fontSize: 14,
    // fontFamily: M,
    lineHeight: 16,
    alignSelf: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
