import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import {
  B12,
  B20,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

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
    : Object.entries(state.infoData).slice(0, 5);

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
        {Object.entries(state.infoData).length > 5 && (
          <Button
            onPress={toggleExpanded}
            title={expanded ? '접기' : '더보기'}
          />
        )}
      </View>
      {state.components}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
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
