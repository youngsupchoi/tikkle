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
import moment from 'moment';

const FriendsEvents = props => {
  const {friendsEventData} = props;

  const sortedData = {
    오늘: [],
    내일: [],
  };
  const tempDates = {};
  for (let i = 2; i <= 7; i++) {
    const temp = moment().add(i, 'days');
    const date = formatDate(temp);
    tempDates[date] = [];
  }

  for (let i = 2; i <= 7; i++) {
    const temp = moment().add(9, 'hours').add(i, 'days');
    const date = formatDate(temp);
    sortedData[date] = [];
  }

  const calculateDaysUntilNextBirthday = birthdayString => {
    const input = birthdayString;
    const input_split = input.split('-');
    const cur = moment().startOf('day').add(9, 'hours');

    const cur_year = moment(cur).year();

    let next_birth = moment(
      cur_year + '-' + input_split[1] + '-' + input_split[2],
    )
      .startOf('day')
      .add(9, 'hours');

    if (next_birth.isBefore(cur)) {
      next_birth.add(1, 'years');
    }

    const diff = next_birth.diff(cur, 'days');

    return diff;
  };

  friendsEventData.forEach(friend => {
    const diff = calculateDaysUntilNextBirthday(friend.birthday);
    console.log('diff of', friend, '\n diff : ', diff);
    switch (diff) {
      case 0:
        sortedData['오늘'].push(friend);
        break;
      case 1:
        sortedData['내일'].push(friend);
        break;
      default:
        if (diff < 7) {
          const date = formatDate(moment().add(diff, 'days'));
          if (tempDates[date]) {
            sortedData[date] = tempDates[date].concat(friend);
          } else {
            console.warn(`Key ${date} not found in sortedData`);
          }
        }
        break;
    }
  });

  //==============================================================================
  //util

  function formatDate(date) {
    const data = moment(date).format('MM월 DD일');
    return data;
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
