import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Animated,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_SUCCESS,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B,
  B12,
  B15,
  B17,
  B22,
  EB,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Detail from 'src/assets/icons/Detail';
import {useFriendMainViewModel} from 'src/presentationLayer/viewModel/friendViewModels/FriendsMainViewModel';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Close from 'src/assets/icons/Close';
import UnBlock from 'src/assets/icons/UnBlock';
import BlockFriend from 'src/assets/icons/BlockFriend';

import {RefreshControl} from 'react-native-gesture-handler';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';

export default function FriendsManagementScreen() {
  const {ref, state, actions} = useFriendMainViewModel();

  useEffect(() => {
    actions.keyboard_friend();
  }, []);

  const toggleDropdown = () => {
    actions.setDropdownVisible_friend(!state.isDropdownVisible_friend);
  };

  useEffect(() => {
    actions.get_friend_data(state.mode_friend);
  }, [state.mode_friend]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <B17>친구 관리</B17>
        </View>
        <AnimatedButton onPress={toggleDropdown} style={{padding: 10}}>
          <Detail
            width={20}
            height={20}
            strokeWidth={1.5}
            stroke={COLOR_BLACK}
          />
        </AnimatedButton>

        {state.isDropdownVisible_friend && (
          <View style={styles.dropdown}>
            <AnimatedButton
              onPress={() => {
                actions.setMode_friend(
                  state.mode_friend === 'unblock' ? 'block' : 'unblock',
                );
                actions.setDropdownVisible_friend(
                  !state.isDropdownVisible_friend,
                );
              }}>
              <M11 customStyle={{fontSize: 12}}>
                {state.mode_friend === 'unblock' ? '차단 목록' : '친구 목록'}
              </M11>
            </AnimatedButton>
          </View>
        )}
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            onSubmitEditing={() => {
              actions.get_friend_search();
            }}
            placeholder="닉네임으로 친구 추가"
            placeholderTextColor={COLOR_GRAY}
            onChangeText={value => actions.setText_search(value)}
            value={state.text_search}
            style={styles.searchText}
          />
          <AnimatedButton
            onPress={() => {
              actions.get_friend_search();
            }}
            style={styles.searchButton}>
            <SearchNormal1
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              scale={1}
              strokeWidth={1.5}
            />
          </AnimatedButton>
        </View>
      </View>

      {state.searchedData.length !== 0 ? (
        <View
          style={{
            height: windowWidth,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLOR_WHITE,
            margin: 24,
            borderRadius: 16,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
              // iOS용 그림자 위치
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2, // iOS용 그림자 투명도
            shadowRadius: 3, // iOS용 그림자 반경
          }}>
          <AnimatedButton
            onPress={() => actions.setSearchedData([])}
            style={{position: 'absolute', top: 8, left: 8, padding: 10}}>
            <Close
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={2}
              scale={0.8}
            />
          </AnimatedButton>
          <View style={{marginBottom: 48}}>
            <Image
              source={{
                uri:
                  state.searchedData[0].image !== null
                    ? state.searchedData[0].image
                    : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
              }}
              style={styles.searchedDataImage}
            />
          </View>
          <B17>{state.searchedData[0].name}</B17>
          <M15 customStyle={{color: COLOR_GRAY, marginTop: 8}}>
            @{state.searchedData[0].nick}
          </M15>

          <View style={{marginTop: 24}}>
            {console.log(state.searchedData[0])}
            {state.searchedData[0].relation_state_id === null ? (
              <AnimatedButton
                onPress={() => {
                  actions.create_friend(state.searchedData[0].id);
                }}
                style={{
                  padding: 12,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLOR_PRIMARY,
                  borderRadius: 12,
                  borderColor: COLOR_PRIMARY_OUTLINE,
                  borderWidth: 2,
                }}>
                <B15 customStyle={{color: COLOR_WHITE, fontFamily: EB}}>
                  친구 추가
                </B15>
              </AnimatedButton>
            ) : null}

            {state.searchedData[0].relation_state_id === 1 ? (
              <M11 customStyle={{marginTop: 12}}>친구</M11>
            ) : null}

            {state.searchedData[0].relation_state_id === 2 ? (
              <M11 customStyle={{marginTop: 12}}>새로운 친구</M11>
            ) : null}

            {state.searchedData[0].relation_state_id === 3 ? (
              <AnimatedButton
                // onPress={onAddFriendButtonPress}
                style={{
                  padding: 12,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLOR_ERROR,
                  borderRadius: 12,
                  borderColor: COLOR_ERROR,
                  borderWidth: 2,
                }}>
                <B15 customStyle={{color: COLOR_WHITE}}>삭제한 이용자</B15>
              </AnimatedButton>
            ) : null}
          </View>
        </View>
      ) : null}
      {console.log(state.getFriendData)}
      <Animated.View
        style={[styles.animatedViewContainer, {opacity: ref.opacityValue}]}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={actions.onRefresh}
            />
          }
          data={state.getFriendData}
          keyExtractor={(item, index) => String(item.id)}
          ListEmptyComponent={
            state.mode_friend === 'unblock'
              ? () => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: windowWidth,
                      }}>
                      <M15>아직 사용 중인 친구가 없네요</M15>
                      <B22>친구를 초대해 보세요!</B22>
                      <AnimatedButton>
                        <B15>공유하기</B15>
                      </AnimatedButton>
                    </View>
                  );
                }
              : () => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: windowWidth,
                      }}>
                      <M15>차단된 친구가 없네요.</M15>
                      <B22>좋아요!</B22>
                    </View>
                  );
                }
          }
          ListHeaderComponent={
            // state.getFriendData.length > 0
            //   ?
            () => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <B15
                    customStyle={{
                      paddingHorizontal: 24,
                    }}>
                    {state.mode_friend === 'unblock'
                      ? '친구 목록'
                      : '차단된 이용자'}
                  </B15>
                </View>
              );
            }
            // : null
          }
          ListFooterComponent={
            state.getFriendData.length > 0
              ? () => {
                  return <View style={{height: windowHeight}} />;
                }
              : null
          }
          renderItem={({item, index}) => {
            return (
              <View
                // onLongPress={() => actions.setSelectedItemId(item.id)}
                key={item.id}
                style={styles.flatListItemContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{
                      uri:
                        item.image !== null
                          ? item.image
                          : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                    }}
                    style={styles.listItemImage}
                  />
                  <View style={styles.listItemTextContainer}>
                    <B15>{item.name}</B15>
                    <B15 customStyle={{color: COLOR_GRAY}}> @{item.nick}</B15>
                  </View>
                </View>
                <View style={{position: 'absolute', right: 20, top: 25}}>
                  {state.mode_friend === 'unblock' ? (
                    <AnimatedButton
                      onPress={() => {
                        actions.block_friend(item);
                      }}>
                      <BlockFriend
                        width={24}
                        height={24}
                        stroke={COLOR_ERROR}
                        strokeWidth={2}
                      />
                    </AnimatedButton>
                  ) : (
                    <AnimatedButton
                      onPress={() => {
                        actions.unblock_friend(item);
                      }}>
                      <UnBlock
                        width={24}
                        height={24}
                        stroke={COLOR_SUCCESS}
                        strokeWidth={2}
                      />
                    </AnimatedButton>
                  )}
                </View>
              </View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
  },
  dropdown: {
    position: 'absolute',
    top: 8,
    right: 65,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  searchBarContainer: {
    marginTop: 8,
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
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchText: {
    color: COLOR_BLACK,
    marginLeft: 12,
    padding: 0,
    fontFamily: B,
    fontSize: 15,
  },
  listHeader: {
    paddingHorizontal: 24,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemImage: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  listItemTextContainer: {
    marginLeft: 12,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
  },
  animatedViewContainer: {
    marginTop: 24,
  },
  searchText: {
    color: COLOR_BLACK,
    marginLeft: 12,
    padding: 0,
    fontFamily: B,
    fontSize: 15,
  },
  searchButton: {
    alignSelf: 'center',
    padding: 4,
    alignItems: 'center',
  },
  flatListItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      // iOS용 그림자 위치
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // iOS용 그림자 투명도
    shadowRadius: 3, // iOS용 그림자 반경
    flexDirection: 'row',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flexDirection: 'row',
  },
  searchedDataImage: {
    width: 120,
    height: 120,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 2,
    borderRadius: 60,
  },
});
