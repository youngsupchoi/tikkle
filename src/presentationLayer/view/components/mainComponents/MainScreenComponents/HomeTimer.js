import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  M20,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
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

      if (minutes <= 1) {
        setDisplay(`${seconds}초`);
      } else if (hours <= 1) {
        setDisplay(`${minutes}분`);
      } else if (days < 1) {
        setDisplay(`${hours}시간`);
      } else {
        setDisplay(`D-${days}`);
      }

      // if (days >= 1) {
      // setDisplay(`D-${days}`);
      // } else if (){
      //   setDisplay(`${hours}시간 ${minutes}분 ${seconds}초`);
      // }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <B17 customStyle={[styles.text, timerStyle]}>{display}</B17>
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
