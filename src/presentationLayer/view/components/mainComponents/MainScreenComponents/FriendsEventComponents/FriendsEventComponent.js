import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import FriendsEvents from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FriendsEventComponents/FriendsEvent';
import {
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';

export default function FriendsEventComponent() {
  const {state} = useMainViewModel();

  return (
    <View>
      {state.friendEventData.length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <B20 customStyle={{fontFamily: EB, marginVertical: 10}}>
              다가오는 기념일
            </B20>
            {/* <AnimatedButton style={styles.animatedButton}>
          <ArrowRight
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1}
          />
        </AnimatedButton> */}
          </View>

          <FriendsEvents friendsEventData={state.friendEventData} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: COLOR_WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {
    //   // iOS용 그림자 위치
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2, // iOS용 그림자 투명도
    // shadowRadius: 3, // iOS용 그림자 반경
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animatedButton: {
    padding: 10,
  },
  friendsEvent: {
    marginTop: SPACING_2,
    marginLeft: SPACING_4,
    marginRight: SPACING_2,
  },
});
