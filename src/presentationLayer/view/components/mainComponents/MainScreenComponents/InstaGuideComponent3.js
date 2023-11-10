import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import pic3 from 'src/assets/images/instaGuide3.png';
export default function InstaGuideComponent3() {
  return (
    <View style={styles.onboardingComponentContainer}>
      <Image resizeMode="center" source={pic3} style={styles.onboardingImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingComponentContainer: {
    borderRadius: 30,
    width: windowWidth * 0.8,
    height: windowHeight * 0.45,
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
    alignItems: 'center',
  },
  detail: {
    marginTop: 16,
    alignItems: 'center',
  },
  onboardingImage: {
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    height: windowHeight * 0.45,
    width: windowWidth * 0.8,
  },
});
