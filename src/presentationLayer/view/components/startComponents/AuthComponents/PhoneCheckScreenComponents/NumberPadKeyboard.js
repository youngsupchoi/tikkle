//NumberPadKeyboard.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NumberPadKeyboard = ({onPressNumber, onPressBackspace}) => {
  const handlePress = number => {
    if (onPressNumber) {
      onPressNumber(number);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({length: 9}, (_, i) => i + 1).map(number => (
        <TouchableOpacity
          key={number}
          style={styles.button}
          onPress={() => handlePress(number)}>
          <Text style={styles.number}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
        disabled={true}>
        <Text style={styles.number}></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
        <Text style={styles.number}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressBackspace && onPressBackspace()}>
        <Text style={styles.number}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '33.33%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
  },
});

export default NumberPadKeyboard;
