import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Postcode from '@actbase/react-daum-postcode';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function PostCodeModal(props) {
  const {state, actions} = props;
  return (
    <View>
      {state !== undefined ? (
        <Modal
          onBackdropPress={() => actions.setShowPostCodeModal(false)}
          isVisible={state.showPostCodeModal}
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
                actions.setShowPostCodeModal(false);
              }}
              onError={error => {
                console.error('Postcode error:', error);
              }}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
