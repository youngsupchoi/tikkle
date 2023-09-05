import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatListComponent,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';
import {
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../../components/Global/Headers/BackHeader';
import {
  B12,
  B15,
  B22,
  B28,
  M11,
  M15,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  backgroundColor,
} from '../../../components/Global/Colors/Colors';
import {
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_6,
} from '../../../components/Global/Spacing/BaseSpacing';
import SearchNormal1 from '../../../assets/icons/SearchNormal1';
import ExportSquare from '../../../assets/icons/ExportSquare';
import FriendsTikkleList from '../../../components/FriendsTikkling/FriendsTikkleList';
// import BuyTikkleModal from '../../../components/FriendsTikkling/BuyTikkleModalFriends';
import BuyTikkleModal from '../../../components/MyTikkling/BuyTikkleModal';
import BarComponent from '../../../components/Home/ProgressBar/ProgressBar';
import TimerComponent from '../../../components/Home/Timer/HomeTimer';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import Modal from 'react-native-modal';

export default function FriendsTikklingScreen(route) {
  const friendsTikklingData = route.route.params;
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false);
    setShowSuccessModal(true);
  };
  const onCloseModal2 = () => {
    setShowSuccessModal(false);
  };

  const data = route.route.params;
  return (
    <View>
      {console.log(data)}
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <BackHeader style={{backgroundColor: COLOR_WHITE}}>
          @ {data.user_name}님의 티클링
        </BackHeader>
        <View style={styles.container}>
          <View style={styles.backgroundImageContainer}>
            <LinearGradient
              colors={[
                'rgba(255,255,255,1)',
                'rgba(255,255,255,0.8)',
                'rgba(255,255,255,0.6)',
                'rgba(255,255,255,0.4)',
                'rgba(255,255,255,0.4)',
                'rgba(255,255,255,0.4)',
                'rgba(255,255,255,0.4)',
                'rgba(255,255,255,0.4)',
                'rgba(255,255,255,0.6)',
                'rgba(255,255,255,0.8)',
                'rgba(255,255,255,1)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.8}}
              style={styles.backgroundImageGradient}
            />
            <Image
              resizeMode="cover"
              blurRadius={0}
              source={{uri: data.thumbnail_image}}
              style={styles.smallImage} // Some style for the image on the MyTikklingScreen
            />
          </View>

          <View style={styles.itemContainer}>
            <View>
              <M11 customStyle={{color: COLOR_GRAY}}>
                {friendsTikklingData.brand_name}
              </M11>
              <B22>{friendsTikklingData.product_name}</B22>
            </View>
            <AnimatedButton style={styles.goDetail}>
              <SearchNormal1
                width={16}
                height={16}
                scale={0.8}
                stroke={COLOR_BLACK}
                strokeWidth={1.5}
              />
              <B12 customStyle={styles.goDetailText}>상품 보기</B12>
            </AnimatedButton>
          </View>
          <View style={styles.barComponentContainer}>
            <BarComponent
              totalPieces={data.tikkle_quantity}
              gatheredPieces={data.tikkle_count}
            />
          </View>
          <View style={styles.timerContainer}>
            <TimerComponent deadline={data.funding_limit} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <AnimatedButton
          onPress={() => {
            setShowModal(!showModal);
          }}
          style={styles.presentButton}>
          <B15 customStyle={{color: COLOR_WHITE}}>선물하기</B15>
        </AnimatedButton>
        <AnimatedButton style={styles.shareButton}>
          <ExportSquare
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1.33}
          />
        </AnimatedButton>
      </View>
      {/* {console.log(friendsTikklingData)} */}
      <BuyTikkleModal
        data={friendsTikklingData}
        showModal={showModal}
        showSuccessModal={showSuccessModal}
        onCloseModal={onCloseModal}
        onCloseModal2={onCloseModal2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  smallImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: -1,
  },
  backgroundImageGradient: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    marginHorizontal: SPACING_2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: SPACING_2,
  },
  goDetail: {flexDirection: 'row'},
  goDetailText: {
    marginLeft: SPACING_1 / 2,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING_2,
    position: 'absolute',
    bottom: SPACING_6 + 8,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  presentButton: {
    width: windowWidth - 16 - 16 - 40 - 16,
    height: 40,
    backgroundColor: COLOR_BLACK,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderColor: COLOR_BLACK,
    borderWidth: 1.5,
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barComponentContainer: {
    width: windowWidth - 32,
    alignSelf: 'center',
  },
  timerContainer: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING_6 * 2,
  },
});
