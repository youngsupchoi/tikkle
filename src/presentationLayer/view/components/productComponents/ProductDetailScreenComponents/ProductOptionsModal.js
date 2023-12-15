import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  windowHeight,
  windowWidth,
  screenHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  B12,
  B15,
  B17,
  EB,
  B20,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_SECOND_BLACK,
  COLOR_SECONDARY,
  COLOR_PRIMARY_OUTLINE,
  backgroundColor,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import {useStartTikklingViewModel} from 'src/presentationLayer/viewModel/tikklingViewModels/StartTikklingViewModel';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import TikklingState from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingState';

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
                customStyle={{
                  color: isSelected ? COLOR_WHITE : COLOR_PRIMARY,
                }}>
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
  product_data,
  selectedOptions,
  setSelectedOptions,
  setOptionPrice,
}) {
  const {state, actions} = useStartTikklingViewModel();
  const {topActions} = useTopViewModel();

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option,
    }));
  };

  const isFirstKeyDefault = Object.keys(productOptions || {})[0] === 'default';
  const isButtonActive =
    isFirstKeyDefault ||
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

  useEffect(() => {
    actions.setSelectedItem(product_data);
  }, []);

  useEffect(() => {
    actions.loadData();
    // console.log(route);
  }, []);

  return (
    <View style={styles.productOptionsModalContainer}>
      {/* {console.log(selectedOptions, productOptions, additionalAmountTotal)} */}
      <Modal
        avoidKeyboard
        // onSwipeComplete={() => setShowModal(false)}
        // swipeDirection={'down'}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        isVisible={showModal}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <View
            style={{
              marginVertical: 8,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderColor: COLOR_SEPARATOR,
              borderBottomWidth: 1,
              paddingBottom: 12,
              height: 62,
            }}>
            <TikklingState state_id={0} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              marginVertical: 12,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
              }}>
              <Image
                source={{uri: productImage}}
                style={{width: 80, height: 80, borderRadius: 12}}
              />
              <View
                style={{
                  paddingTop: 12,
                }}>
                <B12 customStyle={{color: COLOR_GRAY}}>{productBrand}</B12>
                <B17 numberOfLines={2} ellipsizeMode="tail">
                  {productName}
                </B17>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
              }}>
              <Refresh
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={1.3}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <BubbleFilled fill={COLOR_PRIMARY} width={40} height={40} />
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <B12 customStyle={styles.labelText}>목표 티클</B12>
                <B17 customStyle={styles.dataText}>
                  {(productPrice / 5000).toLocaleString()} 개
                </B17>
              </View>
            </View>
          </View>

          {console.log(productOptions)}
          {isFirstKeyDefault ? null : (
            <View>
              <View
                style={{
                  width: '100%',
                  height: 2,
                  borderBottomWidth: 1,
                  borderBottomColor: COLOR_SEPARATOR,
                  marginTop: 12,
                  marginBottom: 16,
                }}
              />
              <B20>옵션 선택</B20>
              <View
                style={{
                  width: '100%',
                  height: 8,
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
            </View>
          )}

          <AnimatedButton
            onPress={() => {
              if (isButtonActive) {
                console.log('@@@@@@@@@@@# : ', state.selectedItem.price);
                console.log('@@@@@@@@@@@# : ', selectedOptions);
                actions.tikklingStartButtonPress(selectedOptions, product_data);
              }
            }}
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
          <View style={{height: 16}} />
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
    paddingTop: 0,
    borderRadius: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: COLOR_PRIMARY,
    // borderWidth: 1,
    // padding: 12,
    // paddingVertical: 16,
    // width: 0.4 * windowWidth,
    // padding: 4,
    paddingRight: 24,
    borderRadius: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 12,
    marginRight: 10,
    // backgroundColor: COLOR_SECONDARY,
    borderRadius: 100,
  },
  innerRowDirection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  innerViewStyle: {
    padding: 0,
    width: windowWidth - 96 - 80,
  },
  productNameContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productDetails: {
    width: windowWidth - 96 - 80 - 12 + 20,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundBottomColor: COLOR_WHITE,
  },
  centeredContainer: {
    alignItems: 'center',
  },
  congratulationsText: {
    fontFamily: EB,
    marginBottom: 12,
  },
  infoText: {
    color: COLOR_SECOND_BLACK,
  },
  lottieStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  leftDetailsContainer: {
    alignItems: 'flex-start',
  },
  labelText: {
    fontFamily: EB,
    color: COLOR_GRAY,
  },
  dataText: {
    color: COLOR_BLACK,
  },
  buttonStyle: {
    padding: 4,
    paddingLeft: 12,
    paddingRight: 24,
    borderRadius: 100,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});
