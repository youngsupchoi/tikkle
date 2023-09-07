import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B12,
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  M11,
} from '../../Global/Typography/Typography';
import {COLOR_GRAY} from '../../Global/Colors/Colors';
import {SPACING_1} from '../../Global/Spacing/BaseSpacing';
import moment from 'moment-timezone';

const TimerComponent = ({deadline}) => {
  const [time, setTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [isGameOver, setIsGameOver] = useState(false); // State to track if the game is over

  useEffect(() => {
    const interval = setInterval(() => {
      // Adjusted this line to set the time to the end of the day
      const deadlineDate = moment
        .tz(deadline, 'YYYY-MM-DD', 'Asia/Seoul')
        .endOf('day');
      const now = moment.tz('Asia/Seoul');
      const duration = moment.duration(deadlineDate.diff(now));

      if (duration <= 0) {
        setTime({
          days: '0',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        setIsGameOver(true); // Set game over state to true
        clearInterval(interval);
        return;
      }

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTime({
        days: String(days).padStart(1, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // If game is over, show "GameOver" else show the timer
  return isGameOver ? (
    <View style={styles.container}>
      <M11 customStyle={styles.gameOverText}>티클링이 끝났어요!</M11>
    </View>
  ) : (
    <View style={styles.container}>
      <M11 customStyle={styles.dayText}>남은 날짜</M11>
      <B17 customStyle={styles.dayText}>D-{time.days}</B17>
      <View style={styles.timeContainer}>
        <B20 style={styles.timeText}>{time.hours}</B20>
        <B20 style={styles.separatorText}>:</B20>
        <B20 style={styles.timeText}>{time.minutes}</B20>
        <B20 style={styles.separatorText}>:</B20>
        <B20 style={styles.timeText}>{time.seconds}</B20>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING_1,
    // flexDirection: 'row',
    width: '100%',
  },
  dayText: {
    // fontSize: 30,
    marginBottom: SPACING_1 / 2,
    color: COLOR_GRAY,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  separatorText: {
    fontSize: 30,
  },
  gameOverText: {
    color: COLOR_GRAY, // added a red color to make it more visible, you can adjust as per your needs
  },
});

export default TimerComponent;
