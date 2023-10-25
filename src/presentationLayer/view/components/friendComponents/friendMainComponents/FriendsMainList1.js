import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {SPACING_1, SPACING_2} from '../Global/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
} from '../Global/Colors/Colors';
import {B15, M11, M15} from '../Global/Typography/Typography';
import AnimatedButton from '../Global/Buttons/AnimatedButton';
import Detail from '../../assets/icons/Detail';
import {useFriendMainViewModel} from 'src/presentationLayer/viewModel/friendViewModels/FriendsMainViewModel';

export default function FriendsManagementSearch1() {
  const {ref, state, actions} = useFriendMainViewModel();

  const friendsData = state.receivedData ? state.receivedData : null;

  const recentlyAddedFriends = friendsData.filter(
    friend => friend.recentlyAdded,
  );

  const oldFriends = friendsData.filter(friend => !friend.recentlyAdded);

  const FriendListItem = ({image, nick, name, id}) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const DropdownMenu = ({id}) => (
      <View style={styles.dropdownMenu}>
        <AnimatedButton
          style={styles.menuItem}
          onPress={() => {
            // Handle block action
            console.log(id);
            actions.put_friend_block(id);
            setMenuVisible(false);
          }}>
          <Text>
            {state.selected === '친구 리스트' ? '친구 삭제' : '되돌리기'}
          </Text>
        </AnimatedButton>
      </View>
    );
    return (
      <View key={id} style={styles.renderItemContainer}>
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
        <View style={styles.buttonContainer}>
          <AnimatedButton
            onPress={() => setMenuVisible(!menuVisible)}
            style={styles.button}>
            <Detail
              stroke={COLOR_BLACK}
              width={24}
              height={24}
              strokeWidth={1}
              scale={1.4}
            />
          </AnimatedButton>
          {console.log(id, name)}
        </View>

        {menuVisible && <DropdownMenu id={id} />}
      </View>
    );
  };

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
            id={item.id}
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {state.selected === '친구 리스트' ? (
        recentlyAddedFriends.length > 0 ? (
          <View>
            <M15>최근 추가된 친구</M15>
            <View style={styles.separator} />
            {recentlyAddedFriends.map(friend => (
              <FriendListItem
                key={friend.id}
                image={friend.image}
                nick={friend.nick}
                name={friend.name}
                id={friend.id}
              />
            ))}
          </View>
        ) : null
      ) : null}

      {state.selected === '친구 리스트' ? (
        oldFriends.length > 0 ? (
          <View>
            <M15>친구</M15>
            <View style={styles.separator} />
            {oldFriends.map(friend => (
              <FriendListItem
                key={friend.id}
                image={friend.image}
                nick={friend.nick}
                name={friend.name}
                id={friend.id}
              />
            ))}
          </View>
        ) : (
          <M15>친구가 없습니다.</M15>
        )
      ) : null}

      {state.selected === '삭제한 친구' ? (
        oldFriends.length > 0 ? (
          <View>
            <M15>삭제한 친구</M15>
            <View style={styles.separator} />
            {oldFriends.map(friend => (
              <FriendListItem
                key={friend.id}
                image={friend.image}
                nick={friend.nick}
                name={friend.name}
                id={friend.id}
              />
            ))}
          </View>
        ) : (
          <M15>삭제한 친구가 없습니다.</M15>
        )
      ) : null}

      {/* <M11>최근 추가된 친구</M11>
      <FriendList data={friendsData.filter(item => item.recentlyAdded)} />
      <M11>친구</M11>
      <FriendList data={friendsData.filter(item => !item.recentlyAdded)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING_2,
    paddingBottom: 200,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
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
  dropdownMenu: {
    position: 'absolute',
    right: 10, // Adjust as needed
    top: 50, // Adjust as needed
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
