import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  B12,
  B15,
  B17,
  B20,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import BubbleFilled from 'src/assets/icons/BubbleFilled';

const OptionList = ({category, options, onSelect, selectedValue}) => {
  return (
    <View style={styles.optionListContainer}>
      <B15 style={styles.categoryTitle}>{category}</B15>
      <FlatList
        data={options}
        horizontal
        keyExtractor={item => item.option}
        contentContainerStyle={{marginBottom: 12}}
        renderItem={({item}) => {
          const isSelected = item.option === selectedValue;
          return (
            <AnimatedButton
              style={[
                {
                  marginRight: 8,
                  padding: 8,
                  paddingHorizontal: 16,
                  borderColor: COLOR_PRIMARY,
                  borderWidth: 1,
                  backgroundColor: isSelected ? COLOR_PRIMARY : COLOR_WHITE,
                  borderRadius: 8,
                  marginTop: 12,
                },
              ]}
              onPress={() => onSelect(category, item.option)}>
              <B15
                customStyle={{
                  alignSelf: 'center',
                  marginBottom: 8,
                  color: isSelected ? COLOR_WHITE : COLOR_PRIMARY,
                }}>
                {item.option}
              </B15>
              <M11
                customStyle={{color: isSelected ? COLOR_WHITE : COLOR_PRIMARY}}>
                +{item.additional_amount.toLocaleString()}원
              </M11>
            </AnimatedButton>
          );
        }}
      />
    </View>
  );
};

export default function ProductOptionsModal({
  productOptions,
  productImage,
  productName,
  productBrand,
  productPrice,
  showModal,
  setShowModal,
  buttonPress,
  selectedOptions,
  setSelectedOptions,
  setOptionPrice,
}) {
  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option,
    }));
  };
  const isButtonActive =
    Object.keys(selectedOptions || {}).length ===
    Object.keys(productOptions || {}).length;

  const getTotalAdditionalAmount = () => {
    return Object.keys(selectedOptions).reduce((total, category) => {
      // 선택된 옵션을 찾습니다.
      const selectedOption = selectedOptions[category];
      // 해당 카테고리의 모든 옵션들을 가져옵니다.
      const options = productOptions[category];
      // 선택된 옵션의 추가 금액을 찾습니다.
      const optionDetails = options.find(
        option => option.option === selectedOption,
      );
      // 해당 추가 금액을 총합에 더합니다.
      return total + (optionDetails ? optionDetails.additional_amount : 0);
    }, 0);
  };
  const additionalAmountTotal = getTotalAdditionalAmount();
  useEffect(() => {
    setOptionPrice(additionalAmountTotal);
  }, [additionalAmountTotal]);

  return (
    <View style={styles.productOptionsModalContainer}>
      {console.log(selectedOptions, productOptions, additionalAmountTotal)}
      <Modal
        onSwipeComplete={() => setShowModal(false)}
        swipeDirection={'down'}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <Image
              source={{uri: productImage}}
              style={{width: 80, height: 80, borderRadius: 12}}
            />
            <View style={{flex: 1, paddingLeft: 12}}>
              <B12>{productBrand}</B12>
              <B17>{productName}</B17>
              <View style={{alignSelf: 'flex-end'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center', // 중앙 정렬을 위해 추가
                    justifyContent: 'center', // 중앙 정렬을 위해 추가
                    borderColor: COLOR_PRIMARY,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 4,
                    paddingLeft: 6,
                    paddingRight: 8,
                  }}>
                  <BubbleFilled width={16} height={16} fill={COLOR_PRIMARY} />
                  <B12 customStyle={{marginLeft: 4}}>
                    {(productPrice / 5000).toLocaleString()} 개
                  </B12>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: COLOR_SEPARATOR,
              marginTop: 12,
              marginBottom: 16,
            }}
          />
          <B20>옵션 선택</B20>
          <View
            style={{
              width: '100%',
              marginTop: 12,
              marginBottom: 16,
            }}
          />

          {productOptions
            ? Object.keys(productOptions).map(category => (
                <OptionList
                  key={category}
                  category={category}
                  options={productOptions[category]}
                  onSelect={handleOptionSelect}
                  selectedValue={selectedOptions[category]}
                />
              ))
            : null}

          <AnimatedButton
            onPress={isButtonActive ? buttonPress : null}
            style={[
              {
                width: '100%',
                backgroundColor: COLOR_PRIMARY,
                padding: 12,
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 12,
              },
              isButtonActive
                ? {backgroundColor: COLOR_PRIMARY}
                : {backgroundColor: COLOR_GRAY},
            ]}>
            <B15 customStyle={{color: COLOR_WHITE}}>티클링 시작하기</B15>
          </AnimatedButton>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  productOptionsModalContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
});
