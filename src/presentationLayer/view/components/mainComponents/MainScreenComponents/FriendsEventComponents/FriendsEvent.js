import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {COLOR_SEPARATOR} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_1,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B15,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';

const FriendsEvents = props => {
  const {friendsEventData} = props;

  const sortedData = {
    오늘: [],
    내일: [],
  };

  for (let i = 2; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    sortedData[formatDate(date)] = [];
  }

  function getUpcomingBirthday(birthdayString) {
    const today = new Date();
    today.setHours(today.getHours() + 9); // 한국 시간대로 조정 (UTC+9)

    const birthday = new Date(birthdayString);

    // 현재 연도의 해당 날짜로 설정
    birthday.setFullYear(today.getFullYear());

    // 만약 현재 연도의 생일이 이미 지나갔다면, 다음 연도로 설정
    if (today > birthday) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    return birthday.toISOString();
  }

  friendsEventData.forEach(friend => {
    const diff = calculateDifference(getUpcomingBirthday(friend.birthday));
    switch (diff) {
      case 0:
        sortedData['오늘'].push(friend);
        break;
      case 365:
        sortedData['오늘'].push(friend);
        break;
      case 1:
        sortedData['내일'].push(friend);
        break;
      case 366:
        sortedData['내일'].push(friend);
        break;
      default:
        if (diff < 7) {
          const date = new Date(friend.birthday);
          const key = formatDate(date);
          if (sortedData[key]) {
            sortedData[key].push(friend);
          } else {
            console.warn(`Key ${key} not found in sortedData`);
          }
        }
        break;
    }
  });

  //==============================================================================
  //util

  function formatDate(date) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  function calculateDifference(dateString) {
    const today = new Date();
    today.setHours(today.getHours() + 9); // 한국 시간대로 조정 (UTC+9)

    const eventDate = new Date(dateString);

    // Setting time to mid-night for both dates
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const diffInMilliseconds = eventDate - today;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays;
  }

  return (
    <View>
      {Object.entries(sortedData).map(([key, value], index) => {
        if (value.length > 0) {
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 24,
                  marginBottom: 0,
                }}>
                <B12>{key}</B12>
                <View style={styles.line} />
              </View>

              {value.map((friend, fIndex) => (
                <AnimatedButton
                  key={fIndex}
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    paddingHorizontal: 12,
                    marginLeft: 8,
                    marginBottom: 8,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 0.5,
                      }}
                      source={{
                        uri: friend.image,
                      }}
                    />
                    <View style={{flexDirection: 'row', marginLeft: 16}}>
                      <B15>{friend.name}</B15>
                      <M15>님의 생일</M15>
                    </View>
                  </View>
                </AnimatedButton>
              ))}
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: SPACING_1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 15,
    marginTop: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: SPACING_1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 16 - 8 - 8 - 24 - 16 - 8,
    marginRight: 8,
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: 44,
    backgroundColor: COLOR_SEPARATOR,
    marginLeft: SPACING_1,
    marginRight: SPACING_1,
  },
  profileImage: {
    marginVertical: SPACING_1,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: SPACING_2,
  },
  rightContainer: {
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    marginTop: 8,
    marginHorizontal: 10,
    backgroundColor: '#e1dddd',
  },
});

export default FriendsEvents;
