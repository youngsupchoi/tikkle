import {View} from 'react-native';
import {Dimensions, StatusBar, SafeAreaView} from 'react-native';
import {backgroundColor, COLOR_PRIMARY} from '../Colors/Colors';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const Safe = ({children}) => {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        //backgroundColor: 'blue',
        backgroundColor: backgroundColor,
      }}>
      {children}
    </SafeAreaView>
  );
};
