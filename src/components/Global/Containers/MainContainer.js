import {View} from 'react-native';
import {Dimensions} from 'react-native';
import {backgroundColor} from '../Colors/Colors';

export const windowWidth = Dimensions.get('screen').width;
export const windowHeight = Dimensions.get('screen').height;

export const MainContainer = ({children}) => {
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
      }}>
      {children}
    </View>
  );
};
