import React, {useState, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {B15} from '../../Global/Typography/Typography';
import {COLOR_SEPARATOR, backgroundColor} from '../../Global/Colors/Colors';

const BuySheet = () => {
  const bottomSheetRef = useRef(null);

  // State to manage the visibility of the BottomSheet
  const [visible, setVisible] = useState(false);

  // Toggle visibility of the BottomSheet
  const handleToggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 1 : 0} // Show if visible, otherwise hide
      snapPoints={['1%', '50%']} // Modified snapPoints
      onChange={handleToggleVisibility} // Toggle visibility upon change
      containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
      handleStyle={{
        backgroundColor: backgroundColor,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
        borderColor: COLOR_SEPARATOR,
        borderWidth: 1,
      }}
      style={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
        borderColor: COLOR_SEPARATOR,
        borderWidth: 1,
      }}>
      <View style={styles.contentContainer}>
        <B15>티클을 선물해볼까요?</B15>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 16,
    backgroundColor: backgroundColor,
  },
});

export default BuySheet;
