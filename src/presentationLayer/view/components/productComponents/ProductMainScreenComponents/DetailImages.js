import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import {
  B12,
  B15,
  B20,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowDown from 'src/assets/icons/ArrowDown';
import ArrowUpFilled from 'src/assets/icons/ArrowUpFilled';
import ArrowUp from 'src/assets/icons/ArrowUp';

export default function DetailImages() {
  const {state} = useProductDetailViewModel();
  const [expanded, setExpanded] = useState(false);

  // 펼치기/접기 기능
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // 현재 상태에 따라 보여줄 아이템 결정
  const itemsToShow = expanded
    ? Object.entries(state.infoData)
    : Object.entries(state.infoData).slice(0, 4);

  return (
    <View>
      <View style={styles.infoContainer}>
        <B20 customStyle={styles.title}>필수 표기 정보</B20>
        <View>
          {itemsToShow.map(([key, value]) => (
            <View style={styles.itemContainer} key={key}>
              <View style={styles.keyContainer}>
                <B12>{key}</B12>
              </View>
              <View style={styles.valueContainer}>
                <M11 customStyle={{color: COLOR_GRAY}}>{value}</M11>
              </View>
            </View>
          ))}
        </View>
        {Object.entries(state.infoData).length > 4 && (
          <AnimatedButton
            style={{
              alignItems: expanded ? 'center' : 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              // backgroundColor: 'red',
              flexDirection: 'row',
            }}
            onPress={toggleExpanded}>
            <B15 customStyle={{paddingHorizontal: 12, color: COLOR_GRAY}}>
              {expanded ? '접기' : '더보기'}
            </B15>
            {expanded ? (
              <ArrowUp
                width={16}
                height={16}
                stroke={COLOR_GRAY}
                scale={16 / 24}
                strokeWidth={3}
              />
            ) : (
              <ArrowDown
                width={16}
                height={16}
                stroke={COLOR_GRAY}
                scale={16 / 24}
                strokeWidth={3}
              />
            )}
          </AnimatedButton>
        )}
      </View>
      {state.components}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: COLOR_WHITE,
  },
  title: {
    marginTop: 24,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderBottomColor: COLOR_SEPARATOR,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderTopColor: COLOR_SEPARATOR,
    borderTopWidth: 0.5,
  },
  keyContainer: {
    flex: 1,
    marginRight: 10,
  },
  valueContainer: {
    flex: 2,
  },
});
