import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {M20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_BLACK} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import moment from 'moment-timezone';

const TimerComponent = ({deadline, timerStyle}) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const deadlineDate = moment.tz(deadline, 'Asia/Seoul').endOf('day');
      const now = moment.tz('Asia/Seoul');
      const duration = moment.duration(deadlineDate.diff(now));

      if (duration <= 0) {
        setDisplay('종료');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      if (days >= 1) {
        setDisplay(`D-${days}`);
      } else {
        setDisplay(`${hours}시간 ${minutes}분 ${seconds}초`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <M20 customStyle={[styles.text, timerStyle]}>{display}</M20>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR_BLACK,
  },
});

export default TimerComponent;
