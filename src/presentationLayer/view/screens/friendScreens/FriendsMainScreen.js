// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Keyboard,
//   Image,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   StatusBarHeight,
//   HEADER_HEIGHT,
//   SPACING_1,
//   SPACING_2,
//   SPACING_3,
//   SPACING_4,
//   SPACING_6,
// } from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
// import {
//   B,
//   B15,
//   B17,
//   B20,
//   B22,
//   B28,
//   B34,
//   M,
//   M11,
//   M15,
// } from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
// import {
//   COLOR_BLACK,
//   COLOR_GRAY,
//   COLOR_PRIMARY,
//   COLOR_SECONDARY,
//   COLOR_SEPARATOR,
//   COLOR_WHITE,
//   backgroundColor,
// } from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
// import {
//   windowHeight,
//   windowWidth,
// } from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
// import LongFilledButton from 'src/presentationLayer/view/components/globalComponents/Buttons/LongFilledButton';
// import {useNavigation} from '@react-navigation/native';
// import BackIcon from 'src/assets/icons/ArrowLeft2.js';
// import FriendsList from 'src/assets/icons/Profile2User.js';
// import SearchNewFriends from 'src/assets/icons/Globalsearch.js';
// import DeletedFriendsList from 'src/assets/icons/ProfileDelete.js';
// import Refresh from 'src/assets/icons/Refresh';
// import FriendsManagementSearch1 from '../../../components/FriendsManagement/FriendsManagementSearch1';
// import FriendsManagementList1 from '../../../components/FriendsManagement/FriendsManagementList1';
// import BackHeader from 'src/presentationLayer/view/components/globalComponents/Headers/BackHeader';
// import MenuHeader from 'src/presentationLayer/view/components/globalComponents/Headers/MenuHeader';
// import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
// import axios from 'axios';
// import {USER_AGENT, BASE_URL} from '@env';
// axios.defaults.headers.common['User-Agent'] = USER_AGENT;
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {RefreshControl} from 'react-native-gesture-handler';
// import FriendsSearchingList from '../../../components/FriendsManagement/FriendsSearchingList';
// import CloseCircle from 'src/assets/icons/CloseCircle';
// import FriendsManagementHeader from 'src/presentationLayer/view/components/globalComponents/Headers/FriendsManagementHeader';

// export default function FriendsManagementScreen() {
//   const [refreshing, setRefreshing] = useState(false);
//   const onRefresh = async () => {
//     setRefreshing(true);

//     // Call your data fetching functions here
//     // await checkTikkling();
//     await get_friend_data();
//     // Add any other data fetching functions if needed

//     setRefreshing(false);
//   };
//   const [selected, setSelected] = useState('친구 리스트');
//   const [text, setText] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   useEffect(() => {
//     // Add event listeners for keyboard show and hide events
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => setIsSearching(true),
//     );

//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => setIsSearching(false),
//     );

//     // Cleanup the listeners on component unmount
//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   //-------------------------------------------------------------------------
//   //토큰 가져오기

//   const printTokensFromAsyncStorage = async () => {
//     try {
//       const tokens = await AsyncStorage.getItem('tokens');

//       if (tokens !== null) {
//         const token = tokens;
//         const {accessToken} = JSON.parse(token);
//         const {refreshToken} = JSON.parse(token);
//         const authorization = `${refreshToken},${accessToken}`;
//         return authorization;
//       } else {
//         console.log('No tokens');
//       }
//     } catch (error) {
//       console.error('Error retrieving tokens', error);
//     }
//   };

//   //-------------------------------------------------------------------------
//   //친구 데이터 조회

//   const [receivedData, setReceivedData] = useState([]);
//   async function get_friend_data(mode) {
//     try {
//       const authorization = await printTokensFromAsyncStorage();
//       if (!authorization) {
//         console.log('No access token found');
//         return;
//       }

//       const response = await axios.get(
//         `https://${BASE_URL}/dev/get_friend_data/${mode}`,
//         {
//           headers: {
//             authorization: authorization,
//           },
//         },
//       );
//       if (response && response.data) {
//         console.log('jjjj', response.data.data);
//         setReceivedData(response.data.data);
//       } else {
//         console.log('Response or response data is undefined');
//       }
//     } catch (error) {
//       if (error.response && error.response.status) {
//         console.error('friend Data [status code] ', error.response.status);
//       }
//       if (error.response && error.response.data) {
//         console.error('friends Data response data : ', error.response.data);
//       }
//     }
//   }
//   useEffect(() => {
//     if (selected === '친구 리스트') {
//       const mode = 'unblock';
//       get_friend_data(mode);
//     } else if (selected === '삭제한 친구') {
//       const mode = 'block';
//       get_friend_data(mode);
//     }
//   }, [selected]);
//   useEffect(() => {
//     console.log('friendsData Received', receivedData);
//   }, [receivedData]);

//   //-------------------------------------------------------------------------
//   const [receivedSearchData, setReceivedSearchData] = useState();

//   //-------------------------------------------------------------------------
//   //이용자 검색

//   async function get_friend_search() {
//     try {
//       const authorization = await printTokensFromAsyncStorage();
//       if (!authorization) {
//         console.log('No access token found');
//         return;
//       }

//       const response = await axios.get(
//         `https://${BASE_URL}/dev/get_friend_search/${text}`,
//         {
//           headers: {
//             authorization: authorization,
//           },
//         },
//       );
//       if (response && response.data) {
//         console.log('searchedData: ', response.data.data);
//         setReceivedSearchData(response.data.data);
//       } else {
//         console.log('Response or response data is undefined');
//       }
//     } catch (error) {
//       if (error.response && error.response.status) {
//         console.error(
//           'friend Search Data [status code] ',
//           error.response.status,
//         );
//       }
//       if (error.response && error.response.data) {
//         console.error(
//           'friends Search Data response data : ',
//           error.response.data,
//         );
//       }
//     }
//   }

//   //-------------------------------------------------------------------------
//   //친구 추가
//   const [addFriendData, setAddFriendsData] = useState();
//   async function post_user_friend() {
//     try {
//       const authorization = await printTokensFromAsyncStorage();
//       if (!authorization) {
//         console.log('No access token found');
//         return;
//       }

//       const response = await axios.post(
//         `https://${BASE_URL}/dev/post_user_friend`,
//         {
//           friendId: receivedSearchData[0].id,
//         },
//         {
//           headers: {
//             authorization: authorization,
//           },
//         },
//       );
//       if (response && response.data) {
//         console.log('Add Friend Data: ', response.data);
//       } else {
//         console.log('Response or response data is undefined');
//       }
//     } catch (error) {
//       if (error.response && error.response.status) {
//         console.error('Add Friend Data [status code] ', error.response.status);
//       }
//       if (error.response && error.response.data) {
//         console.error('Add Friend Data response data : ', error.response.data);
//       }
//     }
//   }

//   const onAddFriendButtonPress = () => {
//     post_user_friend();
//   };
//   const onCloseButtonPress = () => {
//     setReceivedSearchData();
//     setText('');
//   };
//   //-------------------------------------------------------------------------
//   //친구 삭제
//   const [deleteFriendData, setDeleteFriendsData] = useState();
//   async function put_friend_block(userId) {
//     try {
//       const authorization = await printTokensFromAsyncStorage();
//       if (!authorization) {
//         console.log('No access token found');
//         return;
//       }
//       console.log('userIDDIDID', userId);

//       const response = await axios.put(
//         `https://${BASE_URL}/dev/put_friend_block`,
//         {
//           friend_id: userId,
//         },
//         {
//           headers: {
//             authorization: authorization,
//           },
//         },
//       );
//       if (response && response.data) {
//         setDeleteFriendsData(response.data);
//       } else {
//         console.log('Response or response data is undefined');
//       }
//     } catch (error) {
//       if (error.response && error.response.status) {
//         console.error(
//           'Delete Friend Data [status code] ',
//           error.response.status,
//         );
//       }
//       if (error.response && error.response.data) {
//         console.error(
//           'Delete Friend Data response data : ',
//           error.response.data,
//         );
//       }
//     }
//   }

//   useEffect(() => {
//     get_friend_data();
//   }, [deleteFriendData]);

//   const onDeleteFriendButtonPress = () => {
//     put_friend_block();
//   };
//   //-------------------------------------------------------------------------

//   const SearchedItem = () => {
//     return (
//       <View
//         style={{
//           alignItems: 'center',
//           borderRadius: 12,
//           marginHorizontal: 16,
//           borderColor: COLOR_SEPARATOR,
//           borderWidth: 0.5,
//           padding: 24,
//           elevation: 1,
//           backgroundColor: COLOR_WHITE,
//         }}>
//         <AnimatedButton
//           onPress={onCloseButtonPress}
//           style={{position: 'absolute', top: 16, left: 16}}>
//           <CloseCircle
//             width={24}
//             height={24}
//             stroke={COLOR_BLACK}
//             strokeWidth={1.2}
//           />
//         </AnimatedButton>
//         <Image
//           resizeMode="contain"
//           style={{
//             width: 150,
//             height: 150,
//             borderRadius: 75,
//             borderColor: COLOR_SEPARATOR,
//             borderWidth: 0.5,
//             marginTop: 24,
//           }}
//           source={{
//             uri:
//               receivedSearchData[0] && receivedSearchData[0].image !== null
//                 ? receivedSearchData[0].image
//                 : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
//           }}
//         />
//         <View
//           style={{
//             marginTop: SPACING_3,
//             width: windowWidth,
//             paddingHorizontal: SPACING_2,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           {receivedSearchData ? (
//             <View
//               style={{
//                 width: '100%',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <B20 customStyle={{}}>
//                 {receivedSearchData[0] ? receivedSearchData[0].name : null}
//               </B20>
//               {receivedSearchData[0] ? (
//                 receivedSearchData[0].relation_state_id === null ? (
//                   <AnimatedButton
//                     onPress={onAddFriendButtonPress}
//                     style={{
//                       backgroundColor: COLOR_PRIMARY,
//                       paddingHorizontal: 20,
//                       // width: '80%',
//                       paddingVertical: 8,
//                       borderRadius: 4,
//                       marginTop: 16,
//                       elevation: 1,
//                       borderColor: COLOR_SECONDARY,
//                       borderWidth: 0.5,
//                     }}>
//                     <B15 customStyle={{color: COLOR_WHITE}}>친구 추가</B15>
//                   </AnimatedButton>
//                 ) : null
//               ) : null}
//               {receivedSearchData[0].relation_state_id === 1 ? (
//                 <M11 customStyle={{marginTop: 12}}>친구</M11>
//               ) : null}
//               {receivedSearchData[0].relation_state_id === 2 ? (
//                 <M11 customStyle={{marginTop: 12}}>새로운 친구</M11>
//               ) : null}
//               {receivedSearchData[0].relation_state_id === 3 ? (
//                 <AnimatedButton
//                   onPress={onAddFriendButtonPress}
//                   style={{
//                     backgroundColor: COLOR_PRIMARY,
//                     paddingHorizontal: 20,
//                     // width: '80%',
//                     paddingVertical: 8,
//                     borderRadius: 4,
//                     marginTop: 16,
//                     elevation: 1,
//                     borderColor: COLOR_SECONDARY,
//                     borderWidth: 0.5,
//                   }}>
//                   <B15 customStyle={{color: COLOR_WHITE}}>차단한 이용자</B15>
//                 </AnimatedButton>
//               ) : null}
//             </View>
//           ) : null}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       stickyHeaderIndices={[1]}
//       style={styles.friendsManagementContainer}>
//       {/* <MenuHeader>친구 관리</MenuHeader> */}
//       {/* <FriendsManagementHeader /> */}
//       <View>
//         <View style={styles.buttonContainer}>
//           <AnimatedButton
//             onPress={() => setSelected('친구 리스트')}
//             style={styles.buttonElement}>
//             <FriendsList
//               width={28}
//               height={28}
//               stroke={selected === '친구 리스트' ? COLOR_BLACK : COLOR_GRAY}
//               strokeWidth={1.5}
//             />
//             <M11
//               customStyle={{
//                 color: selected === '친구 리스트' ? COLOR_BLACK : COLOR_GRAY,
//               }}>
//               친구 리스트
//             </M11>
//           </AnimatedButton>
//           {/* <AnimatedButton
//             onPress={() => setSelected('새 친구 찾기')}
//             style={styles.buttonElement}>
//             <SearchNewFriends
//               width={28}
//               height={28}
//               stroke={selected === '새 친구 찾기' ? COLOR_BLACK : COLOR_GRAY}
//               strokeWidth={1.5}
//             />
//             <M11
//               customStyle={{
//                 color: selected === '새 친구 찾기' ? COLOR_BLACK : COLOR_GRAY,
//               }}>
//               새 친구 찾기
//             </M11>
//           </AnimatedButton> */}
//           <AnimatedButton
//             onPress={() => setSelected('삭제한 친구')}
//             style={styles.buttonElement}>
//             <DeletedFriendsList
//               width={28}
//               height={28}
//               stroke={selected === '삭제한 친구' ? COLOR_BLACK : COLOR_GRAY}
//               strokeWidth={1.5}
//             />
//             <M11
//               customStyle={{
//                 color: selected === '삭제한 친구' ? COLOR_BLACK : COLOR_GRAY,
//               }}>
//               삭제한 친구
//             </M11>
//           </AnimatedButton>
//         </View>
//         <FriendsManagementSearch1
//           selected={selected}
//           text={text}
//           setText={setText}
//           get_friend_search={get_friend_search}
//         />
//         {console.log(receivedSearchData)}
//         {/* {selected === '삭제한 친구' ? <FriendsManagementSearch1 /> : null} */}
//       </View>

//       {isSearching ? (
//         receivedSearchData ? (
//           <SearchedItem
//             post_user_friend={post_user_friend}
//             put_friend_block={put_friend_block}
//           />
//         ) : null
//       ) : receivedSearchData ? (
//         <SearchedItem />
//       ) : (
//         <FriendsManagementList1
//           post_user_friend={post_user_friend}
//           put_friend_block={put_friend_block}
//           receivedData={receivedData}
//           selected={selected}
//         />
//       )}

//       {receivedSearchData !== [] ? null : null}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   friendsManagementContainer: {
//     backgroundColor: backgroundColor,
//     width: windowWidth,
//     height: windowHeight,
//     backgroundColor: backgroundColor,
//     paddingTop: StatusBarHeight,
//   },
//   friendsManagementHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: HEADER_HEIGHT,
//     paddingBottom: SPACING_1,
//     zIndex: 10,
//   },
//   backButton: {
//     width: 44,
//     height: 44,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingTop: SPACING_2,
//     paddingBottom: SPACING_1,
//     width: '100%',
//     backgroundColor: backgroundColor,
//   },
//   buttonElement: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   searchContainer: {
//     paddingVertical: SPACING_1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   refreshButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 4,
//     borderColor: COLOR_SEPARATOR,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Keyboard,
  Animated,
  Platform,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
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
import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

export default function FriendsManagementScreen() {
  //-------------------------------------------------------------------------
  //토큰 가져오기

  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const token = tokens;
        const {accessToken} = JSON.parse(token);
        const {refreshToken} = JSON.parse(token);
        const authorization = `${refreshToken},${accessToken}`;
        return authorization;
      } else {
        console.log('No tokens');
      }
    } catch (error) {
      console.error('Error retrieving tokens', error);
    }
  };
  //-------------------------------------------------------------------------
  //친구 데이터 조회

  const [getFriendData, setGetFriendData] = useState([]);
  async function get_friend_data(mode) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${BASE_URL}/dev/get_friend_data/${mode}`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      console.log('jjjj', response.data.data);
      if (response && response.data) {
        setGetFriendData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('friend Data [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('friends Data response data : ', error.response.data);
      }
    }
  }

  //-------------------------------------------------------------------------
  //친구 데이터 조회

  const [searchedData, setSearchedData] = useState([]);
  async function get_friend_search() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${BASE_URL}/dev/get_friend_search/${text}`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data) {
        console.log('searchedData: ', response.data.data);
        setSearchedData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error(
          'friend Search Data [status code] ',
          error.response.status,
        );
      }
      if (error.response && error.response.data) {
        console.error(
          'friends Search Data response data : ',
          error.response.data,
        );
      }
    }
  }

  //-------------------------------------------------------------------------
  //친구 데이터 조회

  const [text, setText] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [mode, setMode] = useState('unblock');

  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 키보드가 보여질 때
    const keyboardWillShowSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', // 또는 'keyboardDidShow' for Android
      () => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );

    // 키보드가 사라질 때
    const keyboardWillHideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', // 또는 'keyboardDidHide' for Android
      () => {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const [showBlockOption, setShowBlockOption] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    get_friend_data(mode);
  }, [mode]);
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
        {isDropdownVisible && (
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
                setMode(mode === 'unblock' ? 'block' : 'unblock');
                setDropdownVisible(!isDropdownVisible);
              }}>
              <Text>{mode === 'unblock' ? '삭제한 이용자' : '친구'}</Text>
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
              get_friend_search();
            }}
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
            onPress={() => {
              get_friend_search();
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
      {searchedData.length !== 0 ? (
        <View>
          <B12>{searchedData[0].name}</B12>
        </View>
      ) : null}
      <Animated.View style={{marginTop: 24, opacity: opacityValue}}>
        <FlatList
          data={getFriendData}
          keyExtractor={(item, index) => String(item.id)}
          ListHeaderComponent={() => {
            return (
              <B15 customStyle={{paddingHorizontal: 24}}>
                {mode === 'unblock' ? '친구 목록' : '삭제한 이용자'}
              </B15>
            );
          }}
          ListFooterComponent={() => {
            return <View style={{height: windowHeight}} />;
          }}
          renderItem={({item, index}) => {
            return (
              <AnimatedButton
                onLongPress={() => setSelectedItemId(item.id)}
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
                  <B12>{mode === 'unblock' ? null : '되돌리기'}</B12>
                </AnimatedButton>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={selectedItemId !== null}
                  onRequestClose={() => setSelectedItemId(null)}>
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
                          setSelectedItemId(null);
                        }}>
                        <B12>차단</B12>
                      </AnimatedButton>
                      <AnimatedButton
                        onPress={() => {
                          setSelectedItemId(null);
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
