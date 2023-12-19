import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  B,
  B12,
  B15,
  B20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ProductSearchChips from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearchChips';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Modal from 'react-native-modal';
import Add from 'src/assets/icons/Add';
import Minus from 'src/assets/icons/Minus';
import Coffee from 'src/assets/icons/Coffee';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Cake from 'src/assets/icons/Cake';
import Chicken from 'src/assets/icons/Chicken';

export default function LastPresentResearchModal() {
  const {state, actions} = useProductMainViewModel();

  const priceRanges = [
    {label: '전체가격', min: 0, max: null},
    {label: '0~5만원', min: 0, max: 50000},
    {label: '5만~10만', min: 50000, max: 100000},
    {label: '10만~20만', min: 100000, max: 200000},
    {label: '20만~30만', min: 200000, max: 300000},
    {label: '30만~50만', min: 300000, max: 500000},
    {label: '50만~100만', min: 500000, max: 1000000},
    {label: '100만 이상', min: 1000000, max: 999999999},
  ];
  return (
    <View style={styles.filterContainer}>
      <Modal
        avoidKeyboard
        onBackButtonPress={() => actions.setShowLastPresentModal(false)}
        onBackdropPress={() => actions.setShowLastPresentModal(false)}
        isVisible={state.showLastPresentModal}
        backdropOpacity={0.5}
        style={{margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        {/* //TODO: component로 분리 */}
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <B20 customStyle={{fontSize: 24}}>티클이 선물을 추천해드려요!</B20>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Coffee
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={1.6}
                scale={1.2}
              />
              <B15 customStyle={styles.title}>지난 생일에 받은 총 커피 수</B15>
            </View>
            <View style={styles.rowContainer}>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('minus', 'coffee');
                }}
                style={styles.button}>
                <Minus
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                />
              </AnimatedButton>
              <B20>{state.tempSelectedCoffee}</B20>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('add', 'coffee');
                }}
                style={styles.button}>
                <Add
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={2}
                />
              </AnimatedButton>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Chicken
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={2}
              />
              <B15 customStyle={styles.title}>지난 생일에 받은 총 치킨 수</B15>
            </View>
            <View style={styles.rowContainer}>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('minus', 'chicken');
                }}
                style={styles.button}>
                <Minus
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                />
              </AnimatedButton>
              <B20>{state.tempSelectedChicken}</B20>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('add', 'chicken');
                }}
                style={styles.button}>
                <Add
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={2}
                />
              </AnimatedButton>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Cake
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={2}
              />
              <B15 customStyle={styles.title}>
                케이크, 향수 등 3만 원 내외의 선물 수
              </B15>
            </View>
            <View style={styles.rowContainer}>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('minus', 'others');
                }}
                style={styles.button}>
                <Minus
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                />
              </AnimatedButton>
              <B20>{state.tempSelectedOthers}</B20>
              <AnimatedButton
                onPress={() => {
                  actions.minusOrAdd('add', 'others');
                }}
                style={styles.button}>
                <Add
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={2}
                />
              </AnimatedButton>
            </View>
          </View>
          <AnimatedButton
            onPress={() => {
              actions.submitButtonPressed();
            }}
            style={styles.submitButton}>
            <B15 customStyle={{fontFamily: EB, color: COLOR_WHITE}}>
              추천 받기
            </B15>
          </AnimatedButton>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLOR_WHITE,
    padding: 16,
    paddingTop: 40,
    borderRadius: 24,
    marginHorizontal: 12,
  },
  headerContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemContainer: {marginVertical: 12},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: backgroundColor,
    alignSelf: 'center',
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
  },
  submitButton: {
    padding: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  title: {
    marginLeft: 8,
    fontSize: 17,
  },
});
