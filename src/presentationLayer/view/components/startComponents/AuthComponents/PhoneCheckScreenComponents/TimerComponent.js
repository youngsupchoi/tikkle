// TimerComponent.js
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR_ERROR} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {M11} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
//TODO: viewmodel 분리
export default function TimerComponent() {
  const {ref, state, actions} = useStartViewModel();

  // Function to convert seconds to mm:ss format
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const decreaseTime = () => {
    actions.setTimeLeft(prevTime => prevTime - 1);
  };

  useEffect(() => {
    const timer = setInterval(decreaseTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.timeContainer}>
      <M11 customStyle={{color: COLOR_ERROR}}>
        남은 시간 : {formatTime(state.timeLeft)}
      </M11>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING_4,
    paddingVertical: SPACING_2,
  },
});
