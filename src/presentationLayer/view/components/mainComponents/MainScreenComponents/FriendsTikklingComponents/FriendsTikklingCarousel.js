import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  B12,
  B15,
  B17,
  B22,
  EB,
  M,
  M11,
  M15,
  M17,
  M20,
  UNIQUE,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
// import {windowWidth} from '../Global/Containers/MainContainer';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  SPACING_1,
  SPACING_2,
  SPACING_3,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
// import BarComponent from '../ProgressBar/ProgressBar';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
// import SmallBarComponent from '../ProgressBar/ProgressBarSmall';
import SmallBarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBarSmall';
// import LinearGradient from 'react-native-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_PRIMARY_TEXT,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
// import HomeCard from '../HomeScreen/HomeCard';
// import FriendsTikklingCard from './FriendsTikklingCard';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
// import TimerComponent from '../HomeScreen/HomeTimer';
import TimerComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/HomeTimer';
// import BuyTikkleModal from '../../MyTikkling/BuyTikkleModal';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';

export default function FriendsTikklingCarousel(data) {
  const [showBuyModal, setShowBuyModal] = useState(null);
  const onCloseModal = () => {
    setShowBuyModal(null);
  };

  const navigation = useNavigation();
  const renderFriendsTikkling = ({item}) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemHeaderContainer}>
          <Image
            resizeMode="contain"
            style={styles.renderItemProfileImage}
            source={{
              uri:
                item.friend_image !== null
                  ? item.friend_image
                  : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <B15 customStyle={{marginLeft: 8}}>{item.user_name}</B15>
            <B15 customStyle={{color: COLOR_GRAY}}>•@{item.nick}</B15>
          </View>
        </View>
        <View style={{padding: 0, paddingBottom: 20}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              'rgba(0,44,133,0.2)',
              'rgba(0,44,133,0.4)',
              'rgba(0,44,133,0.5)',
            ]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: -1,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          />
          <Image
            resizeMode="cover"
            blurRadius={20}
            source={{
              uri: item.thumbnail_image !== null ? item.thumbnail_image : '',
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -2,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }} // Some style for the image on the MyTikklingScreen
          />

          <View
            style={{
              backgroundColor: COLOR_WHITE,
              padding: 16,
              borderRadius: 12,
              margin: 12,
              marginTop: 32,
              marginBottom: 24,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View>
                <Image
                  resizeMode="cover"
                  source={{
                    uri:
                      item.thumbnail_image !== null ? item.thumbnail_image : '',
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: COLOR_SEPARATOR,
                  }} // Some style for the image on the MyTikklingScreen
                />
              </View>
              <View style={{}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 12,
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <View style={{}}>
                        <B15 customStyle={{fontFamily: EB}}>
                          {item.product_name}
                        </B15>
                        <B12
                          customStyle={{color: COLOR_GRAY, marginVertical: 4}}>
                          현재까지{' '}
                          {Math.round(
                            (item.tikkle_count / item.tikkle_quantity) * 1000,
                          ) / 10}
                          % 달성했어요!
                        </B12>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLOR_WHITE,
                      borderRadius: 40,
                      borderColor: COLOR_BLACK,
                      borderWidth: 1,
                      padding: 3,
                      paddingHorizontal: 6,
                    }}>
                    <M11>{item.brand_name}</M11>
                  </View>
                </View>

                <View style={{width: '90%', alignSelf: 'center', marginTop: 4}}>
                  <BarComponent
                    totalPieces={item.tikkle_quantity}
                    gatheredPieces={item.tikkle_count}
                  />
                </View>
              </View>
            </View>
            <View style={{position: 'absolute', bottom: 4, right: 12}}>
              <B15 customStyle={{fontFamily: UNIQUE}}>TIKKLE</B15>
            </View>
          </View>

          <View style={{paddingHorizontal: 24}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <B17 customStyle={{fontFamily: EB, color: COLOR_WHITE}}>
                남은 티클
              </B17>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <M15 customStyle={{color: COLOR_WHITE}}>
                  {item.tikkle_quantity - item.tikkle_count}
                </M15>
                <M15 customStyle={{color: COLOR_WHITE}}> 개</M15>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 24,
              }}>
              <B17 customStyle={{fontFamily: EB, color: COLOR_WHITE}}>
                남은 시간
              </B17>
              <View style={{}}>
                <TimerComponent
                  timerStyle={{fontSize: 15, fontFamily: M, color: COLOR_WHITE}}
                  deadline={item.funding_limit}
                />
              </View>
            </View>

            <View style={{marginTop: 32}}>
              <AnimatedButton
                onPress={() => {
                  new Date(item.funding_limit) > new Date()
                    ? setShowBuyModal(item.tikkling_id)
                    : null;
                }}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: COLOR_PRIMARY,
                  borderColor: COLOR_PRIMARY_OUTLINE,
                  borderWidth: 2,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                disabled={new Date(item.funding_limit) < new Date()}>
                <B17 customStyle={{color: COLOR_PRIMARY_TEXT}}>
                  {'티클 선물하기'}
                </B17>
              </AnimatedButton>
            </View>
          </View>
        </View>
        <BuyTikkleModal
          data={item}
          showModal={showBuyModal === item.tikkling_id}
          onCloseModal={onCloseModal}
        />
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
    elevation: 3,
  },
  cardContainer: {
    marginTop: 16,
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
    justifyContent: 'flex-end',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 12,
    // marginTop: 8,
    marginBottom: 0,
    // borderRadius: 12,
    // padding: SPACING_1 / 2,
    // shadowColor: '#323247',
    // shadowRadius: 0,
    // elevation: 3,
    // backgroundColor: backgroundColor,
  },
  renderItemContainer: {
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    paddingTop: 8,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    elevation: 4,
    // margin: 8,
    marginLeft: 24,
    marginHorizontal: 8,
  },
  renderItemHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  renderItemProfileImage: {width: 36, height: 36, borderRadius: 24},
});
