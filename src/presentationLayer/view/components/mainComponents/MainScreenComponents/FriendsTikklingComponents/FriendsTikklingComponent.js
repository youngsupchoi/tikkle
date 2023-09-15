import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  COLOR_BLACK,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowRight from 'src/assets/icons/ArrowRight';
import FriendsTikklingCarousel from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FriendsTikklingComponents/FriendsTikklingCarousel';

export default function FriendsTikklingComponent() {
  const {ref, state, actions} = useMainViewModel();
  return (
    <View
      style={{
        marginVertical: 12,
        backgroundColor: COLOR_WHITE,
        borderRadius: 24,
        paddingTop: 16,
        marginHorizontal: 16,
        paddingBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          // iOS용 그림자 위치
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2, // iOS용 그림자 투명도
        shadowRadius: 3, // iOS용 그림자 반경
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}>
        <B20 customStyle={{fontFamily: EB}}>친구들의 티클링</B20>
        {/* <AnimatedButton style={{padding: 10}}>
          <ArrowRight
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1}
          />
        </AnimatedButton> */}
      </View>
      <View>
        <FriendsTikklingCarousel data={state.friendTikklingData} />
      </View>
    </View>
  );
}
