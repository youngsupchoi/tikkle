import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  B12,
  B15,
  B17,
  B22,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Modal from 'react-native-modal';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import Noti_Refund from 'src/assets/icons/Noti_Refund';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Message from 'src/assets/icons/Message';

export default function WhoParticipated({data, showModal, setShowModal}) {
  const {state, actions} = useMainViewModel();
  const [tooltipVisibility, setTooltipVisibility] = useState({});
  const toggleTooltip = itemId => {
    setTooltipVisibility(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <View style={styles.tikkleModalContainer}>
      <Modal
        onSwipeComplete={() => setShowModal(false)}
        swipeDirection={'down'}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={styles.modalContent}>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <B22>티클을 선물한 이용자</B22>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(item.created_at)}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLOR_SEPARATOR,
                }}
              />
            )}
            renderItem={({item, index}) => {
              const isTooltipVisible = tooltipVisibility[item.id];
              return (
                <View style={styles.flatListItemContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {item.state_id === 2 ? (
                        <Noti_Refund
                          width={60}
                          height={60}
                          stroke={COLOR_BLACK}
                          strokeWidth={1}
                          scale={1}
                          fill={COLOR_BLACK}
                        />
                      ) : (
                        <Image
                          source={{
                            uri:
                              item.image !== null
                                ? item.image
                                : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                          }}
                          style={{width: 60, height: 60, borderRadius: 24}}
                        />
                      )}

                      <View style={styles.listItemTextContainer}>
                        {console.log(item.message)}
                        <View style={{marginBottom: 2}}>
                          {item.state_id == 3 ? (
                            <B15 customStyle={{color: COLOR_ERROR}}>
                              [환불] {item.NAME}
                            </B15>
                          ) : (
                            <B15>{item.NAME}</B15>
                          )}
                          <B12 customStyle={{color: COLOR_GRAY}}>
                            {item.message !== null
                              ? item.message
                              : '티클만 선물했어요!'}
                          </B12>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <M11 customStyle={{color: COLOR_GRAY}}>
                            {item.created_at.split('T')[0]}
                            {'  '}
                            {item.created_at.split('T')[1].split('.')[0]}
                          </M11>
                        </View>
                      </View>
                    </View>
                    {/* <Tooltip
                      topAdjustment={
                        Platform.OS === 'android' ? -StatusBarHeight : 0
                      }
                      isVisible={isTooltipVisible}
                      content={
                        <View style={{padding: 12, paddingVertical: 4}}>
                          <View style={{}}>
                            <B15 customStyle={{color: COLOR_PRIMARY}}>
                              {'메시지'}
                            </B15>
                          </View>
                          <View style={{}}>
                            <M11>{item.message}</M11>
                          </View>
                        </View>
                      }
                      placement="center"
                      animated={true}
                      backgroundColor="rgba(0,0,0,0.1)"
                      disableShadow={true}
                      onClose={() => {
                        toggleTooltip(item.id);
                      }}>
                      <AnimatedButton
                        style={{alignItems: 'center', marginRight: 12}}
                        onPress={() => toggleTooltip(item.id)}>
                        {item.message ? (
                          <Message
                            width={24}
                            height={24}
                            stroke={COLOR_BLACK}
                            strokeWidth={2}
                            scale={1}
                          />
                        ) : null}

                        <M15 customStyle={{color: COLOR_BLACK}}>
                          {item.quantity}개
                        </M15>
                      </AnimatedButton>
                    </Tooltip> */}

                    <M15 customStyle={{color: COLOR_BLACK}}>
                      {item.quantity}개
                    </M15>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tikkleModalContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  title: {
    marginTop: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
  itemTitle: {
    marginLeft: 4,
  },
  itemDetail: {
    marginTop: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 16,
  },
  amountItem: {
    width: '50%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    paddingBottom: 12,
    // backgroundColor: 'red',
  },
  closeButtonText: {
    color: COLOR_PRIMARY,
    fontSize: 16,
  },
  itemContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: SPACING_2,
    zIndex: 10,
  },
  presentButton: {
    width: '100%',
    // height: 40,
    padding: 12,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: COLOR_PRIMARY_OUTLINE,
    // borderWidth: 2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
    borderColor: COLOR_GRAY,
  },
  flatListItemContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItemTextContainer: {
    marginLeft: 12,
  },
});
