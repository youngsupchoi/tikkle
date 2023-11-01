import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TestAxios} from './test/TestAxios';
import {TestToken_get} from '../TestToken_get';
import {TestToken_reset} from './test/TestToken_reset';

import {loginTokenData} from 'src/dataLayer/DataSource/Auth/LoginTokenData';
import {checkPhoneNumberData} from 'src/dataLayer/DataSource/Auth/CheckPhoneNumberData';
import {checkOtpData} from 'src/dataLayer/DataSource/Auth/CheckOtpData';
import {checkNickDuplicationData} from 'src/dataLayer/DataSource/Auth/CheckNickDuplicationData';
import {loginPhoneData} from 'src/dataLayer/DataSource/Auth/LoginPhoneData';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {loginRegisterData} from 'src/dataLayer/DataSource/Auth/LoginRegisterData';

import {getMyWishlistData} from 'src/dataLayer/DataSource/User/GetMyWishlistData';

import {getMyEndTikklingData} from 'src/dataLayer/DataSource/User/GetMyEndTikklingData';
import {getMyPaymentData} from 'src/dataLayer/DataSource/User/GetMyPaymentData';
import {getMyIsNoticeData} from 'src/dataLayer/DataSource/User/GetMyIsNoticeData';

import {createMyWishlistData} from 'src/dataLayer/DataSource/Product/CreateMyWishlistData';
import {deleteMyWishlistData} from 'src/dataLayer/DataSource/User/DeleteMyWishlistData';

import {updateMyAddressData} from 'src/dataLayer/DataSource/User/UpdateMyAddressData';
import {updateMyNickData} from 'src/dataLayer/DataSource/User/UpdateMyNickData';
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {createNewFriendData} from 'src/dataLayer/DataSource/Friend/CreateNewFriendData';
import {getMyTikklingData} from 'src/dataLayer/DataSource/Tikkling/GetMyTikklingData';
import {getSearchFriendData} from 'src/dataLayer/DataSource/Friend/GetSearchFriendData';

import {createPhoneFriendData} from 'src/dataLayer/DataSource/Friend/CreatePhoneFriendData';
import {getFriendEventData} from 'src/dataLayer/DataSource/Friend/GetFriendEventData';
import {getMyFriendData} from 'src/dataLayer/DataSource/Friend/GetMyFriendData';
import {getBlockedFriendData} from 'src/dataLayer/DataSource/Friend/GetBlockedFriendData';
import {updateFriendBlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendBlockData';
import {getFriendTikklingData} from 'src/dataLayer/DataSource/Friend/GetFriendTikklingData';
import {createTikklingData} from 'src/dataLayer/DataSource/Tikkling/CreateTikklingData';
import {updateCancelTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateCancelTikklingData';
import {createSendTikkleData} from 'src/dataLayer/DataSource/Tikkling/CreateSendTikkleData';
import {getRecivedTikkleData} from 'src/dataLayer/DataSource/Tikkling/GetRecivedTikkleData';
import {updateEndTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingData';
import {getProductInfoData} from 'src/dataLayer/DataSource/Product/GetProductInfoData';
import {getProductListData} from 'src/dataLayer/DataSource/Product/GetProductListData';
import {updateProductViewData} from 'src/dataLayer/DataSource/Product/UpdateProductViewData';
import {getNoticeListData} from 'src/dataLayer/DataSource/Notification/GetNoticeListData';
import {deleteNoticeData} from 'src/dataLayer/DataSource/Notification/DeleteNoticeData';
import {getProfileUpdataUrlData} from 'src/dataLayer/DataSource/User/GetProfileUpdataUrlData';
import {deleteProfileData} from 'src/dataLayer/DataSource/User/DeleteProfileData';
import {updateFriendUnlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendUnblockData';

import {getHomeScreenData} from 'src/dataLayer/DataSource/User/GetHomeScreenData';

import {updateMyAccountData} from 'src/dataLayer/DataSource/User/UpdateMyAccountData';

import {updateEndTikklingBuyData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingBuyData';
import {updateEndTikklingRefundData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingRefundData';
import {updateStopTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateStopTikklingData';

import {getMyPageScreenData} from 'src/dataLayer/DataSource/User/GetMyPageScreenData';
import {getBankListData} from 'src/dataLayer/DataSource/User/GetBankListData';

import {getImportPaymentData} from 'src/dataLayer/DataSource/Payment/GetImportPaymentData';
import {updateRefundMyPaymentData} from 'src/dataLayer/DataSource/Payment/UpdateRefundMyPaymentData';
import {updatePresentTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdatePresentTikkleInitData';
import {updateBuyMyTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdateBuyMyTikkleInitData';

import {getTikkleDetailData} from 'src/dataLayer/DataSource/Tikkling/GetTikkleDetailData';
import {updateDeviceTokenData} from 'src/dataLayer/DataSource/User/UpdateDeviceTokenData';
import {getProductOptionData} from 'src/dataLayer/DataSource/Product/GetProductOptionData';

import moment from 'moment';

export default function TestScreen() {
  const [ret, setRet] = useState('test');

  // Function to handle button press
  const handleButtonPress = async () => {
    const list = ['01034567890', '1234567890', '0109999999', '01046328480'];

    // const axiosResponse = await updateDeviceTokenData('TEST_TOKEN');

    // const input = '1999-11-01';
    // const input_split = input.split('-');
    // const cur = moment().startOf('day').add(9, 'hours');

    // const cur_year = moment(cur).year();

    // let next_birth = moment(
    //   cur_year + '-' + input_split[1] + '-' + input_split[2],
    // )
    //   .startOf('day')
    //   .add(9, 'hours');

    // if (next_birth.isBefore(cur)) {
    //   console.log('1 년');
    //   next_birth.add(1, 'years');
    // }

    // const diff = next_birth.diff(cur, 'days');

    // console.log('cur : ', cur);
    // console.log('next_birth : ', next_birth);
    // console.log('diff : ', diff);

    a = moment('2023-10-15').add(9, 'hours').endOf('day');

    console.log('TEST: ', moment().isAfter(moment('2023-11-01').endOf('day')));

    const axiosResponse = 'DS';
    const str = JSON.stringify(axiosResponse, null, ' ');
    console.log(str);
    setRet(str);
  };

  useEffect(() => {
    handleButtonPress();
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 14}}>{ret}</Text>
    </View>
  );
}
