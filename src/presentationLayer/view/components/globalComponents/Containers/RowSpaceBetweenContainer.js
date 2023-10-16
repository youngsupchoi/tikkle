import {View} from 'react-native';
import React from 'react';

export default function RowSpaceBetweenContainer({children}) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {children}
    </View>
  );
}
