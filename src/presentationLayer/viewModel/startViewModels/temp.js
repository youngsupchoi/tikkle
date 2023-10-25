import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_4,
} from '../../components/Global/Spacing/BaseSpacing';
import {
  B12,
  B17,
  B22,
  M15,
} from '../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  backgroundColor,
} from '../../components/Global/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import AnimatedButton from '../../components/Global/Buttons/AnimatedButton';
import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
import {post_friend_phoneCheck} from '../../components/Axios/post_friend_phonecheck';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

export default function SignUpScreen4() {
  //-------------------------------------------------------------------------
  //전화번호로 친구 찾기
  const [friends, setFriends] = useState([]);

  async function post_friend_phoneCheck() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const transformedContacts = transformContactsData(contactsData);

      const response = await axios.post(
        `https://${BASE_URL}/dev/post_friend_phonecheck`,
        transformedContacts,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data) {
        setFriends(JSON.parse(response.data.body).data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('check [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('check response data : ', error.response.data);
      }
    }
  }

  const [contactsData, setContactsData] = useState([]);

  const findContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await Contacts.getAll();
        let phoneNumbersProcessed = [];
        const formattedData = result.reduce((acc, contact) => {
          const {phoneNumbers, givenName, familyName} = contact;
          phoneNumbers.forEach(phoneNumber => {
            const numberWithoutDashes = phoneNumber.number.replace(/-/g, ''); // Remove dashes
            if (
              numberWithoutDashes.length === 11 &&
              numberWithoutDashes.startsWith('010') &&
              !phoneNumbersProcessed.includes(numberWithoutDashes)
            ) {
              phoneNumbersProcessed.push(numberWithoutDashes);
              const formattedPhoneNumber =
                numberWithoutDashes.slice(0, 3) +
                '-' +
                numberWithoutDashes.slice(3, 7) +
                '-' +
                numberWithoutDashes.slice(7);
              acc.push({
                name: `${familyName}${givenName}`,
                phoneNumber: numberWithoutDashes, // For server
                formattedPhoneNumber: formattedPhoneNumber, // For display
              });
            }
          });
          return acc;
        }, []);
        setContactsData(formattedData);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  function transformContactsData(contactsData) {
    return {
      phone_list: contactsData.map(contact => contact.phoneNumber),
    };
  }

  const navigation = useNavigation();

  useEffect(() => {
    findContacts();
  }, []);

  useEffect(() => {
    contactsData.length !== 0
      ? post_friend_phoneCheck({setFriends, contactsData})
      : null;
  }, [contactsData]);

  return (
    <View style={styles.findFriendsByContactsContainer}>
      <View style={styles.findFriendsByContactsHeader}>
        <View>
          {/* {console.log(contactsData)} */}
          <B22 customStyle={{marginBottom: SPACING_1}}>
            전화번호로 친구 찾기
          </B22>
          <M15 customStyle={{color: COLOR_GRAY}}>
            연락처를 통해 자동으로 친구가 추가되지만
          </M15>
          <M15 customStyle={{color: COLOR_GRAY}}>
            언제든 다시 삭제할 수 있어요!
          </M15>
        </View>
        <View>
          <AnimatedButton
            onPress={() => {
              buttonPress();
            }}>
            <B17 customStyle={{color: COLOR_GRAY}}>다음</B17>
          </AnimatedButton>
        </View>
      </View>
      <FlatList
        data={contactsData}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <B17>현재 티클 서비스를 사용중인 친구가 더 없네요.</B17>
            </View>
          );
        }}
        renderItem={({item}) => (
          <View style={styles.renderItemContainer}>
            <View>
              <B17>{`${item.name}`}</B17>
              <M15 customStyle={{color: COLOR_GRAY, marginTop: SPACING_1 / 2}}>
                {`${item.formattedPhoneNumber}`}
              </M15>
            </View>
            <View>
              <AnimatedButton style={styles.friendsButtonContainer}>
                <B12 customStyle={{color: COLOR_PRIMARY}}>친구 삭제</B12>
              </AnimatedButton>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  findFriendsByContactsContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: SPACING_2,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  findFriendsByContactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    marginBottom: SPACING_4,
    marginTop: StatusBarHeight,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: backgroundColor,
    width: '100%',
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING_1,
    borderColor: COLOR_BLACK,
    borderWidth: 1,
  },
  renderItemContainer: {
    marginVertical: SPACING_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendsButtonContainer: {
    paddingVertical: SPACING_1 / 2,
    paddingHorizontal: SPACING_1,
    borderColor: COLOR_PRIMARY,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44,
  },
});
