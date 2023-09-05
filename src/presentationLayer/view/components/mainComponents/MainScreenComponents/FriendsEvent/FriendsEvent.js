import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_1,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B15,
  B17,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Present from 'src/assets/icons/Present.js';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import MessageQuestion from 'src/assets/icons/MessageQuestion';

const FriendsEvents = props => {
  const {friendsEventData} = props;

  const sortedData = {
    오늘: [],
    내일: [],
  };

  for (let i = 2; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    sortedData[formatDate(date)] = [];
  }

  friendsEventData.forEach(friend => {
    const diff = calculateDifference(friend.birthday);
    switch (diff) {
      case 0:
        sortedData['오늘'].push(friend);
        break;
      case 1:
        sortedData['내일'].push(friend);
        break;
      default:
        if (diff < 7) {
          const date = new Date(friend.birthday);
          const key = formatDate(date);
          sortedData[key].push(friend);
        }
        break;
    }
  });

  const todayData = friendsEventData.filter(
    friend => calculateDifference(friend.birthday) === 0,
  );
  const tomorrowData = friendsEventData.filter(
    friend => calculateDifference(friend.birthday) === 1,
  );
  const upcomingData = friendsEventData.filter(
    friend => calculateDifference(friend.birthday) > 1,
  );
  const renderItem = (event, index) => (
    <View key={index} style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.line} />
        <Image
          resizeMode="cover"
          style={styles.profileImage}
          source={{
            uri:
              event.profileImage !== ''
                ? event.profileImage
                : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
          }}
        />
        <M15 customStyle={styles.eventText}>@{event.userID}님의 생일</M15>
      </View>
      <AnimatedButton style={styles.rightContainer}>
        <Present
          width={24}
          height={24}
          stroke={COLOR_PRIMARY}
          strokeWidth={1.6}
          scale={1.2}
        />

        <M11 customStyle={{color: COLOR_PRIMARY}}>선물하기</M11>
      </AnimatedButton>
    </View>
  );

  //==============================================================================
  //util

  function formatDate(date) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  function calculateDifference(dateString) {
    const today = new Date();
    const eventDate = new Date(dateString);

    // Setting time to mid-night for both dates
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const diffInMilliseconds = eventDate - today;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays;
  }

  ////==============================================================================

  // Group the events by date
  // const groupedEvents = friendsEventData.friendsEventData.reduce(
  //   (groups, event) => {
  //     const date = event.date;
  //     if (!groups[date]) {
  //       groups[date] = [];
  //     }
  //     groups[date].push(event);
  //     return groups;
  //   },
  //   {},
  // );

  // // Get today's date
  // const today = new Date().toISOString().slice(0, 10);

  // // Get the date for tomorrow and the day after tomorrow
  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // const dayAfterTomorrow = new Date();
  // dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // const formatDate = date => {
  //   const options = {month: 'short', day: 'numeric'};
  //   return new Date(date).toLocaleDateString(undefined, options);
  // };

  return (
    // <View style={styles.container}>
    //   {console.log(friendsEventData)}
    //   {groupedEvents[today] && (
    //     <View style={styles.sectionContainer}>
    //       <B17>오늘</B17>
    //       {groupedEvents[today].map((event, index) => renderItem(event, index))}
    //     </View>
    //   )}

    //   {groupedEvents[tomorrow.toISOString().slice(0, 10)] && (
    //     <View style={styles.sectionContainer}>
    //       <B17>내일</B17>
    //       {groupedEvents[tomorrow.toISOString().slice(0, 10)].map(
    //         (event, index) => renderItem(event, index),
    //       )}
    //     </View>
    //   )}

    //   {groupedEvents[dayAfterTomorrow.toISOString().slice(0, 10)] && (
    //     <View style={styles.sectionContainer}>
    //       <B17>모레</B17>
    //       {groupedEvents[dayAfterTomorrow.toISOString().slice(0, 10)].map(
    //         (event, index) => renderItem(event, index),
    //       )}
    //     </View>
    //   )}
    // </View>

    <View>
      {Object.entries(sortedData).map(([key, value], index) => {
        if (value.length > 0) {
          return (
            <View key={index}>
              <B12>{key}</B12>
              {value.map((friend, fIndex) => (
                <AnimatedButton
                  key={fIndex}
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    paddingHorizontal: 12,
                    marginLeft: 8,
                    marginVertical: 8,
                    paddingVertical: 8,
                    borderLeftColor: COLOR_SEPARATOR,
                    borderLeftWidth: 2,
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
                        uri:
                          friend.image !== null
                            ? friend.image
                            : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                      }}
                    />
                    <View style={{flexDirection: 'row', marginLeft: 16}}>
                      <B15>{friend.name}</B15>
                      <M15>님의 생일</M15>
                    </View>
                  </View>
                  <View>
                    {friend.is_tikkling ? (
                      <AnimatedButton
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          width: 70,
                        }}>
                        <M11
                          customStyle={{
                            marginBottom: 4,
                            color: COLOR_PRIMARY,
                          }}>
                          선물하기
                        </M11>
                        <Present
                          width={24}
                          height={24}
                          scale={1.35}
                          stroke={COLOR_PRIMARY}
                          strokeWidth={1}
                        />
                      </AnimatedButton>
                    ) : (
                      <AnimatedButton
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          width: 70,
                        }}>
                        <M11
                          customStyle={{
                            marginBottom: 4,
                            color: COLOR_PRIMARY,
                          }}>
                          뭐 받을래!
                        </M11>
                        <MessageQuestion
                          width={24}
                          height={24}
                          scale={1}
                          stroke={COLOR_PRIMARY}
                          strokeWidth={1.5}
                        />
                      </AnimatedButton>
                    )}
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
});

export default FriendsEvents;
