import {View, Platform, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {PermissionsAndroid} from 'react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_PRIMARY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

async function requestAndroidPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('All permissions granted!');
    } else {
      console.log('Permissions denied');
    }
  } catch (err) {
    console.log(err);
  }
}

export default function EditProfilePicture() {
  const {state, actions} = useMyPageViewModel();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    }
  }, []);

  return (
    <View style={{marginTop: 24}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri:
              state.image !== null ? state.image : state.userData_profile.image,
          }}
          style={{width: 120, height: 120, borderRadius: 60}}
        />
        <AnimatedButton
          onPress={actions.NewImage}
          style={{
            paddingHorizontal: 16,
            borderColor: COLOR_PRIMARY,
            borderWidth: 1,
            paddingVertical: 4,
            borderRadius: 8,
            marginTop: 16,
          }}>
          <B15 customStyle={{color: COLOR_PRIMARY}}>프로필 사진 변경</B15>
        </AnimatedButton>
        {/* <Button title="Select & Crop Image" onPress={selectAndCropImage} /> */}
      </View>
    </View>
  );
}
