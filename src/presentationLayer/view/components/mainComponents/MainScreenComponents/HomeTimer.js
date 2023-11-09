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
      const d = moment(deadline).endOf('day').add(9, 'hours');

      const diff = -1 * moment().add(9, 'hours').diff(d, 'seconds');

      if (diff <= 0) {
        setDisplay('종료');
        clearInterval(interval);
        return;
      }

      if (diff < 60) {
        setDisplay(`${diff}초`);
      } else if (diff < 3600) {
        setDisplay(`${moment().add(9, 'hours').diff(d, 'minutes')}분`);
      } else if (diff < 86400) {
        setDisplay(`${moment().add(9, 'hours').diff(d, 'hours')}시간`);
      } else {
        setDisplay(`D${moment().add(9, 'hours').diff(d, 'days')}`);
      }
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
