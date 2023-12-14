import {View} from 'react-native';
import {Dimensions, StatusBar} from 'react-native';
import {backgroundColor, COLOR_PRIMARY, COLOR_WHITE} from '../Colors/Colors';

export const windowWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('screen').height;

export const windowHeight = Dimensions.get('window').height;

export const MainContainer = ({children}) => {
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
      }}>
      {children}
    </View>
  );
};
