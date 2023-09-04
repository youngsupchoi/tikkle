// import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
// import React, {useState} from 'react';
// import {
//   MainContainer,
//   windowWidth,
// } from '../../components/Global/Containers/MainContainer';
// import {
//   Body,
//   Button,
//   Caption,
//   H1,
//   H2,
// } from '../../components/Global/Typography/Typography';
// import {BASE_SPACING} from '../../components/Global/Spacing/BaseSpacing';
// import {COLOR_BLACK} from '../../components/Global/Colors/Colors';
// import {
//   getProfile,
//   login,
//   logout,
//   unlink,
// } from '@react-native-seoul/kakao-login';
// import {useNavigation} from '@react-navigation/native';
// import TextButton from '../../components/Global/Buttons/TextButton';
// import AnimatedButton from '../../components/Global/Buttons/AnimatedButton';

// export default function SignUpScreen() {
//   const navigation = useNavigation();
//   const signInWithKakao = async () => {
//     const token = await login();
//     return token;
//   };

//   const signOutWithKakao = async () => {
//     const message = await logout();

//     return message;
//   };

//   const getKakaoProfile = async () => {
//     const profile = await getProfile();

//     return profile;
//   };

//   const unlinkKakao = async () => {
//     const message = await unlink();

//     return message;
//   };
//   return (
//     <MainContainer>
//       <View style={{width: windowWidth - 32, position: 'absolute', top: 100}}>
//         <H1>라이폴리를</H1>
//         <H2>시작해볼까요?</H2>
//       </View>
//       <View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-end'}}>
//         <AnimatedButton
//           onPress={async () => {
//             try {
//               const signInResult = await signInWithKakao();
//               const kakaoProfileResult = await getKakaoProfile();

//               if (kakaoProfileResult !== null) {
//                 console.log(kakaoProfileResult);
//                 navigation.navigate('findFriendsByContacts');
//               } else {
//                 console.log(kakaoProfileResult);
//               }
//             } catch (error) {
//               console.log(error);
//             }
//           }}>
//           <Image
//             source={require('../../assets/images/kakao_login_large_wide.png')}
//             style={{width: windowWidth - BASE_SPACING * 2, height: 50}}
//           />
//         </AnimatedButton>
//       </View>
//       <View
//         style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
//         <View
//           style={{
//             width: windowWidth - 32,
//             height: 1,
//             backgroundColor: COLOR_BLACK,
//             marginVertical: 24,
//           }}
//         />
//         <View
//           style={{
//             padding: 4,
//             alignItems: 'center',
//           }}>
//           <Body>또는</Body>
//         </View>
//         <AnimatedButton>
//           <TextButton>전화번호로 로그인</TextButton>
//         </AnimatedButton>
//       </View>
//     </MainContainer>
//   );
// }
