import {ScrollView, View} from 'react-native';
import React from 'react';
import EditProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/EditProfileHeader';
import EditProfilePicture from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/EditProfilePicture';
import EditRefundAccount from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/EditRefundAccount';
import EditAddress from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/EditAddress';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import EditNickname from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/EditNickname';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export default function EditProfileScreen() {
  const {state, actions} = useMyPageViewModel();
  return (
    <View>
      <ScrollView
        style={{backgroundColor: backgroundColor, paddingBottom: 240}}>
        <EditProfileHeader />
        {state.loading_profileEdit ? (
          <GlobalLoader />
        ) : (
          <View>
            <EditProfilePicture />
            <EditNickname />
            <EditRefundAccount />
            <EditAddress />
            <View style={{height: 240}} />
          </View>
        )}
      </ScrollView>

      <PostCodeModal state={state} actions={actions} />
      <DetailAddressInput state={state} actions={actions} />
    </View>
  );
}
