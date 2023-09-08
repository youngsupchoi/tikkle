import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Animated,
  Modal,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
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
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Detail from 'src/assets/icons/Detail';
import {useFriendMainViewModel} from 'src/presentationLayer/viewModel/friendViewModels/FriendsMainViewModel';
import {useNavigation} from '@react-navigation/native';

export default function FriendsManagementScreen() {
  const navigation = useNavigation();
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
    <View
      style={{
        paddingTop: StatusBarHeight,
        backgroundColor: backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          height: HEADER_HEIGHT,
        }}>
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
          <View
            style={{
              position: 'absolute', // 절대 위치 설정
              top: HEADER_HEIGHT,
              right: 24, // 오른쪽에 10만큼 떨어진 곳에 위치
              width: 150,
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 12,
              elevation: 10, // 그림자 효과 (Android)
              shadowColor: '#000', // 그림자 효과 (iOS)
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              zIndex: 2,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.setMode_friend(
                  state.mode_friend === 'unblock' ? 'block' : 'unblock',
                );
                actions.setDropdownVisible_friend(
                  !state.isDropdownVisible_friend,
                );
              }}>
              <Text>
                {state.mode_friend === 'unblock' ? '삭제한 이용자' : '친구'}
              </Text>
            </AnimatedButton>
          </View>
        )}
      </View>
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
          }}>
          <TextInput
            onSubmitEditing={() => {
              actions.get_friend_search();
            }}
            placeholder="아이디로 이용자 검색"
            placeholderTextColor={COLOR_GRAY}
            onChangeText={value => actions.setText_search(value)}
            value={state.text_search}
            style={{
              color: COLOR_BLACK,
              marginLeft: 12,
              padding: 0,
              fontFamily: B,
              fontSize: 15,
            }}
          />
          <AnimatedButton
            onPress={() => {
              actions.get_friend_search();
            }}
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
        </View>
      </View>
      {state.searchedData.length !== 0 ? (
        <View>
          <B12>{state.searchedData[0].name}</B12>
        </View>
      ) : null}
      <Animated.View style={{marginTop: 24, opacity: ref.opacityValue}}>
        <FlatList
          data={state.getFriendData}
          keyExtractor={(item, index) => String(item.id)}
          ListHeaderComponent={() => {
            return (
              <B15 customStyle={{paddingHorizontal: 24}}>
                {state.mode_friend === 'unblock'
                  ? '친구 목록'
                  : '삭제한 이용자'}
              </B15>
            );
          }}
          ListFooterComponent={() => {
            return <View style={{height: windowHeight}} />;
          }}
          renderItem={({item, index}) => {
            return (
              <AnimatedButton
                onLongPress={() => actions.setSelectedItemId(item.id)}
                key={item.id}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 16,
                  marginVertical: 8,
                  marginHorizontal: 24,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {console.log(item)}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri:
                        item.image !== null
                          ? item.image
                          : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                    }}
                    style={{width: 48, height: 48, borderRadius: 32}}
                  />
                  <View style={{marginLeft: 12, flexDirection: 'row'}}>
                    <B15>{item.name}</B15>
                    <B15 customStyle={{color: COLOR_GRAY}}> @{item.nick}</B15>
                  </View>
                </View>
                <AnimatedButton>
                  <B12>
                    {state.mode_friend === 'unblock' ? null : '되돌리기'}
                  </B12>
                </AnimatedButton>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={state.selectedItemId !== null}
                  onRequestClose={() => actions.setSelectedItemId(null)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                    <View
                      style={{
                        padding: 20,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        width: '80%',
                      }}>
                      <B12>해당 사용자를 차단하시겠습니까?</B12>
                      <AnimatedButton
                        onPress={() => {
                          // 차단 처리 로직 추가
                          actions.setSelectedItemId(null);
                        }}>
                        <B12>차단</B12>
                      </AnimatedButton>
                      <AnimatedButton
                        onPress={() => {
                          actions.setSelectedItemId(null);
                        }}>
                        <B12>취소</B12>
                      </AnimatedButton>
                    </View>
                  </View>
                </Modal>
              </AnimatedButton>
            );
          }}
        />
      </Animated.View>
    </View>
  );
}
