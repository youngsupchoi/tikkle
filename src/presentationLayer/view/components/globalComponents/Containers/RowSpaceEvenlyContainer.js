import {View} from 'react-native';
import React from 'react';

export default function RowSpaceEvenlyContainer({children}) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      {children}
    </View>
  );
}
