import {View, Text, Button, Platform, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_PRIMARY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import axios from 'axios';

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
    console.warn(err);
  }
}

export default function EditProfilePicture() {
  const [image, setImage] = useState(null);
  const {state, actions} = useMyPageViewModel();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    }
  }, []);

  const uploadImageToServer = async imagePath => {
    let formData = new FormData();

    // 이미지 파일을 FormData에 추가
    formData.append('file', {
      uri: imagePath,
      type: 'image/jpeg', // 이미지 형식에 따라 변경
      name: 'upload.jpg', // 원하는 파일 이름으로 변경
    });

    console.log('$$$$ : ', state.profileUrl);
    try {
      let response = await fetch(state.profileUrl, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      if (response.status !== 200) {
        console.error('Error uploading image. HTTP Status:', response.status);
        const errorText = await response.text();
        console.error('Server response:', errorText);
        return;
      }

      console.log(response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const selectAndCropImage = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (selectedImage) {
        setImage(selectedImage.path);
        actions.getProfileUrl();
        uploadImageToServer(selectedImage.path);
      }
    } catch (error) {
      if (error.message !== 'User cancelled image picker') {
        console.warn('ImagePicker Error:', error);
      }
    }
  };

  return (
    <View style={{marginTop: 24}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: image !== null ? image : state.userData_profile.image}}
          style={{width: 120, height: 120, borderRadius: 60}}
        />
        <AnimatedButton
          onPress={selectAndCropImage}
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
