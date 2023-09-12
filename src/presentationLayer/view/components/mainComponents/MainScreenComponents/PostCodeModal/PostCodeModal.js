import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Postcode from '@actbase/react-daum-postcode';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function PostCodeModal() {
  const {state, actions} = useMainViewModel();
  return (
    <Modal
      onBackdropPress={actions.onCloseSearchModal}
      isVisible={state.showSearchModal}
      backdropOpacity={0.5}>
      <View
        style={{
          width: windowWidth - 48,
          height: windowWidth,
        }}>
        <Postcode
          style={{
            width: windowWidth - 48,
            height: windowWidth,
            backgroundColor: backgroundColor,
          }}
          jsOptions={{animation: true}}
          onSelected={data => {
            actions.setAddress(data.address);
            actions.setZonecode(data.zonecode);
            // actions.setShowSearchModal(false);
            // actions.setShowDetailModal(true);
          }}
        />
      </View>
    </Modal>
  );
}
