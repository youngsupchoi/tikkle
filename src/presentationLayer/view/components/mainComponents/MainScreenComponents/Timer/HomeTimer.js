import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B12,
  B15,
  B20,
  B22,
  B28,
  B34,
  M15,
  M34,
} from '../../Global/Typography/Typography';
import {COLOR_BLACK, COLOR_GRAY} from '../../Global/Colors/Colors';
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
      // console.log(deadlineDate, now, duration);

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
      <B15 customStyle={styles.gameOverText}>티클링이 끝났어요!</B15>
    </View>
  ) : (
    <View style={styles.container}>
      <M15 customStyle={{color: COLOR_GRAY, marginBottom: 4}}>남은 날짜</M15>
      <M15 customStyle={styles.dayText}>D-{time.days}</M15>
      <M15 customStyle={{color: COLOR_GRAY, marginBottom: 4, marginTop: 24}}>
        남은 시간
      </M15>
      <View style={styles.timeContainer}>
        <M34 customStyle={styles.timeText}>{time.hours}</M34>
        <M34 customStyle={styles.separatorText}>:</M34>
        <M34 customStyle={styles.timeText}>{time.minutes}</M34>
        <M34 customStyle={styles.separatorText}>:</M34>
        <M34 customStyle={styles.timeText}>{time.seconds}</M34>
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
    fontSize: 28,
    lineHeight: 56,
    marginBottom: SPACING_1 / 2,
    color: COLOR_BLACK,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 32,
    lineHeight: 56,
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
