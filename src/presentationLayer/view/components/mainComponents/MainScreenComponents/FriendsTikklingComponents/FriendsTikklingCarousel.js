import {View, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {
  B,
  B12,
  B15,
  B17,
  EB,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {SPACING_1} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
import LinearGradient from 'react-native-linear-gradient';
import ArrowRight from 'src/assets/icons/ArrowRight';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_PRIMARY_TEXT,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import TimerComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/HomeTimer';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import FlagFilled from 'src/assets/icons/FlagFilled';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';
import moment from 'moment';
import Gift from 'src/assets/icons/Gift';

export default function FriendsTikklingCarousel(data) {
  const [showBuyModal, setShowBuyModal] = useState(null);
  const onCloseModal = () => {
    setShowBuyModal(null);
  };

  const navigation = useNavigation();
  const renderFriendsTikkling = ({item}) => {
    return (
      <View style={styles.renderItemContainer}>
        <AnimatedButton
          onPress={() => {
            // console.log('press');
            navigation.navigate('tikklingDetail', {
              tikkling_id: item.tikkling_id,
              from: true,
            });
          }}
          style={styles.renderItemHeaderContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={styles.renderItemProfileImage}
              source={{
                uri: item.friend_image,
              }}
            />

            <B15 customStyle={{marginLeft: 8, fontSize: 13}}>
              {item.user_name + '  '}
            </B15>
          </View>

          <AnimatedButton
            style={{
              marginRight: 5,
              marginBottom: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              // console.log('press');
              navigation.navigate('tikklingDetail', {
                tikkling_id: item.tikkling_id,
                from: true,
              });
            }}>
            <ArrowRight
              stroke={COLOR_GRAY}
              width={20}
              height={15}
              strokeWidth={1.5}
              scale={0.85}
            />
          </AnimatedButton>
        </AnimatedButton>

        <AnimatedButton
          onPress={() => {
            // console.log('press');
            navigation.navigate('tikklingDetail', {
              tikkling_id: item.tikkling_id,
              from: true,
            });
          }}
          style={{padding: 0, paddingBottom: 0}}>
          <View
            style={{
              borderRadius: 12,
              margin: 12,
              marginTop: 0,
            }}>
            <View style={styles.cardContainer}>
              <View
                style={{
                  width: 240,
                  height: 180,
                  borderColor: COLOR_SEPARATOR,
                  borderRadius: 12,
                  borderWidth: 1,
                }}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: item.thumbnail_image,
                  }}
                  style={{
                    borderRadius: 12,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -2,
                  }}
                />

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.75}}
                  colors={[
                    'rgba(255,255,255,0)',
                    'rgba(255,255,255,0.3)',
                    'rgba(255,255,255,1)',
                  ]}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    zIndex: -1,
                    borderRadius: 12,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 16,
                    right: 16,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}>
                  <B15 customStyle={{fontFamily: EB}}>
                    {item.product_name.length > 30
                      ? item.product_name.substring(0, 30) + '...'
                      : item.product_name}
                  </B15>
                  {/* <B12>{item.brand_name}</B12> */}
                </View>
              </View>
              {/**이상한 놈들 */}
              <View
                style={{position: 'relative', width: 240, marginBottom: 20}}>
                {/**달성률 */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                    marginTop: 20,
                    paddingHorizontal: 12,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <FlagFilled fill={COLOR_PRIMARY} />
                    <B15>달성률</B15>
                  </View>
                  <B12 customStyle={{color: COLOR_GRAY, marginVertical: 4}}>
                    {Math.round(
                      (item.tikkle_count / item.tikkle_quantity) * 1000,
                    ) / 10}
                    %
                  </B12>
                </View>

                <View style={{paddingHorizontal: 12}}>
                  <BarComponent
                    totalPieces={item.tikkle_quantity}
                    gatheredPieces={item.tikkle_count}
                  />
                </View>

                {/**버튼 시작*/}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 1,
                      backgroundColor: COLOR_WHITE,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 30,
                      paddingRight: 12,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLOR_SECONDARY,
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 30,
                      }}>
                      <BubbleFilled
                        fill={COLOR_PRIMARY}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View style={{marginLeft: 4}}>
                      <B12> {item.tikkle_quantity - item.tikkle_count}개</B12>
                    </View>
                  </View>

                  <View
                    style={{
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 1,
                      backgroundColor: COLOR_WHITE,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 30,
                      paddingRight: 12,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLOR_SECONDARY,
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 30,
                      }}>
                      <Gift width={16} height={16} />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <B12> {item.tikkle_quantity}개</B12>
                    </View>
                  </View>
                </View>
                {/**버튼 끝 */}
              </View>
              {/**이상한 놈들 끝 */}
            </View>

            <View style={{paddingHorizontal: 0}}>
              <View style={{marginTop: 0}}>
                <AnimatedButton
                  onPress={() => {
                    setShowBuyModal(item.tikkling_id);
                    console.log(item.user_id);
                    // moment().isAfter(moment(item.funding_limit).endOf('day'))
                    //   ? null
                    //   : setShowBuyModal(item.tikkling_id);
                  }}
                  style={{
                    padding: 4,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: COLOR_PRIMARY,
                    borderColor: COLOR_PRIMARY,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  // disabled={
                  //   // new Date(item.funding_limit) < new Date()
                  //   moment().isAfter(moment(item.funding_limit).endOf('day'))
                  // }
                >
                  <B15 customStyle={{color: COLOR_WHITE}}>{'마음 전하기'}</B15>
                </AnimatedButton>
              </View>
            </View>
          </View>

          {/** */}

          <BuyTikkleModal
            data={item}
            showModal={showBuyModal === item.tikkling_id}
            onCloseModal={onCloseModal}
          />
        </AnimatedButton>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data.data}
        renderItem={renderFriendsTikkling}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  friendsTikklingContainer: {
    // width: windowWidth / 2,
    // height: (windowWidth / 2) * 1.5,
    // marginHorizontal: SPACING_1,
    // marginBottom: SPACING_2,
  },
  footer: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginVertical: SPACING_1,
    width: 15,
    height: 15,
    borderRadius: 15,

    marginRight: SPACING_1,
  },
  wishlistImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    borderRadius: 12,
    // elevation: 3,
  },
  cardContainer: {
    // marginTop: 16,
    // width: windowWidth / 2 - 32,
    // height: windowWidth / 2 - 32,
    zIndex: 1,
    alignSelf: 'center',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    // backgroundColor: 'red',
  },
  smallTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  renderItemContainer: {
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    paddingTop: 8,
    borderRadius: 20,
    backgroundColor: COLOR_WHITE,
    // elevation: 4,
    marginLeft: 24,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  renderItemHeaderContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 10,
  },
  renderItemProfileImage: {width: 30, height: 30, borderRadius: 12},
});
