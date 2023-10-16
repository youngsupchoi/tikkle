import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';

import {SPACING_1, SPACING_2} from '../Global/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
} from '../Global/Colors/Colors';
import {B15, M11, M15} from '../Global/Typography/Typography';
import Present from '../../assets/icons/Present';
import AnimatedButton from '../Global/Buttons/AnimatedButton';

export default function FriendsSearchingList() {
  const friendsData = [
    {
      id: 1,
      image: null,
      nick: 'heung_q1',
      name: '이흥규',
    },
    {
      id: 2,
      image: null,
      nick: 'sjsjmine1',
      name: '엄승주',
    },
    {
      id: 3,
      image: null,
      nick: 'sup1214',
      name: '최영섭',
    },
    // Old friends
    {
      id: 4,
      image: null,
      nick: 'dream1356',
      name: '흥큐',
    },
    {
      id: 5,
      image: null,
      nick: 'sunwoo',
      name: '선우',
    },
    {
      id: 6,
      image: null,
      nick: 'good',
      name: '아몰랑',
    },
  ];

  const FriendListItem = ({image, nick, name}) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.profileContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri:
                image !== null
                  ? image
                  : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
            }}
          />
          <View style={{marginLeft: 12}}>
            <B15>@{nick}</B15>
            <M11 customStyle={{color: COLOR_GRAY}}>{name}</M11>
          </View>
        </View>
        <Text>
          <View style={styles.buttonContainer}>
            <AnimatedButton style={styles.button}>
              <Present
                stroke={COLOR_PRIMARY}
                width={24}
                height={24}
                strokeWidth={1}
                scale={1.4}
              />
            </AnimatedButton>
          </View>
        </Text>
      </View>
    );
  };

  // const FriendListItem = ({item, index}) => {
  //   return (
  //     <View style={styles.renderItemContainer}>
  //       <View style={styles.profileContainer}>
  //         <Image
  //           resizeMode="contain"
  //           style={styles.image}
  //           source={{
  //             uri:
  //               item.image !== ''
  //                 ? item.image
  //                 : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
  //           }}
  //         />
  //         <View style={{marginLeft: 12}}>
  //           <B15>@{item.nick}</B15>
  //           <M11 customStyle={{color: COLOR_GRAY}}>{item.name}</M11>
  //         </View>
  //       </View>
  //       <Text>
  //         <View style={styles.buttonContainer}>

  //           <AnimatedButton style={styles.button}>
  //             <Present
  //               stroke={COLOR_PRIMARY}
  //               width={24}
  //               height={24}
  //               strokeWidth={1}
  //               scale={1.4}
  //             />
  //           </AnimatedButton>
  //         </View>
  //       </Text>
  //     </View>
  //   );
  // };

  const FriendList = ({data}) => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <FriendListItem
            image={item.image}
            nick={item.nick}
            name={item.name}
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <FlatList data={friendsData} renderItem={FriendListItem} /> */}
        {friendsData.map(friend => (
          <FriendListItem
            key={friend.id}
            image={friend.image}
            nick={friend.nick}
            name={friend.name}
          />
        ))}
      </View>
      <M15>친구</M15>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING_2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemContainer: {
    marginVertical: SPACING_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: COLOR_SEPARATOR,
    width: '100%',
    height: 1,
    marginTop: SPACING_1,
  },
});
