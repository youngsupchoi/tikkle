import {useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {CONTRACT_URL, PRIVATECONTRACT_URL, REFUNDPOLICY_URL} from '@env';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMyPageViewState} from '../../viewState/myPageStates/MyPageState';

// 2. 데이터 소스 또는 API 가져오기

import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getMyPageScreenData} from 'src/dataLayer/DataSource/User/GetMyPageScreenData';
import {useNavigation, useRoute} from '@react-navigation/native'; // 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {getProfileUpdataUrlData} from 'src/dataLayer/DataSource/User/GetProfileUpdataUrlData';
import {updateMyNickData} from 'src/dataLayer/DataSource/User/UpdateMyNickData';
import {updateMyAccountData} from 'src/dataLayer/DataSource/User/UpdateMyAccountData';
import {updateMyAddressData} from 'src/dataLayer/DataSource/User/UpdateMyAddressData';
import {deleteUserData} from 'src/dataLayer/DataSource/User/DeleteUserData';
import {getImportPaymentData} from 'src/dataLayer/DataSource/Payment/GetImportPaymentData';
import {updateRefundMyPaymentData} from 'src/dataLayer/DataSource/Payment/UpdateRefundMyPaymentData';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMyPageViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMyPageViewState();
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  /**
   * MyPageScreen에서 페이지에 필요한 정보를 불러오는 함수
   */
  async function MyPageData() {
    try {
      await getMyPageScreenData()
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          actions.setUserData_profile(res.DSdata.user_info);
          actions.setBank(res.DSdata.bank);
          actions.setNewAccount(res.DSdata.user_info.account);
          actions.setNewBankName(res.DSdata.user_info.bank_name);
          actions.setEndTikklingData(res.DSdata.end_tikkling);
          actions.setPaymentHistoryData(res.DSdata.payment);
          actions.setZonecode(res.DSdata.user_info.zonecode);
          actions.setAddress(res.DSdata.user_info.address);
        });
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in MyPageViewModel's get_user_info]\n", error);
    }
  }

  const calculateDaysUntilNextBirthday = birthdayString => {
    const input = birthdayString;
    const input_split = input.split('-');
    const cur = moment().startOf('day').add(9, 'hours');

    const cur_year = moment(cur).year();

    let next_birth = moment(
      cur_year + '-' + input_split[1] + '-' + input_split[2],
    )
      .startOf('day')
      .add(9, 'hours');

    if (next_birth.isBefore(cur)) {
      next_birth.add(1, 'years');
    }

    const diff = next_birth.diff(cur, 'days');

    if (diff == 0) {
      return `오늘은 생일이에요!`;
    }
    actions.setTimeUnitlNextBirthday(diff);

    return;
  };

  const loadData = async () => {
    try {
      await actions.setLoading_profile(true);
      await getMyPageScreenData()
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          // console.log('res : ', res.DSdata.user_info);
          actions.setUserData_profile(res.DSdata.user_info);
          actions.setBank(res.DSdata.bank);
          actions.setNewBankName(res.DSdata.user_info.bank_name);
          actions.setEndTikklingData(res.DSdata.end_tikkling);
          actions.setPaymentHistoryData(res.DSdata.payment);
          actions.setZonecode(res.DSdata.user_info.zonecode);
          actions.setAddress(res.DSdata.user_info.address);
          calculateDaysUntilNextBirthday(res.DSdata.user_info.birthday);
        });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await actions.setLoading_profile(false);
    }
  };

  const onRefresh = async () => {
    //await actions.setRefreshing(true);
    await loadData();
    //await actions.setRefreshing(false);
  };

  /**
   * MyPageScreen에서 날짜 데이터 포멧하는 함수
   * @param {String (date)} isoDateString
   * @returns
   */
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed, hence +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  /**
   *  MyPageScreen에서 생일까지 남은 날짜를 계산하는 함수
   * @param {string(date)} birthdayString
   * @returns
   */

  /**
   * customerCenterScreen에서 서비스 이용 약관 링크를 연결하는 함수
   */
  const contractLink = () => {
    // Define the URL you want to link to
    const url = CONTRACT_URL;
    Linking.openURL(url);
  };
  const refundPolicyLink = () => {
    // Define the URL you want to link to
    const url = REFUNDPOLICY_URL;
    Linking.openURL(url);
  };

  /**
   * customerCenterScreen에서 개인정보 처리방침 링크를 연결하는 함수
   */
  const privateDataLink = () => {
    // Define the URL you want to link to
    const url = PRIVATECONTRACT_URL;
    Linking.openURL(url);
  };

  /**
   * InquireScreen에서 문의하기 버튼을 눌렀을 때, 문의 내용을 보내는 함수
   */
  async function sendMail() {
    await actions.setInquireLoading(true);

    await createMyInquireData(state.titleText, state.contentText)
      .then(res => {
        //console.log(res);
        return topActions.setStateAndError(res);
      })
      .then(res => {
        //actions로
        actions.setTitleText('');
        actions.setContentText('');
        // navigation.goBack();
        // console.log('res : ', res);
        topActions.showSnackbar(res.DSmessage, 1);
      });

    await actions.setInquireLoading(false);
  }

  const onCloseDetailModal = () => {
    actions.setShowDetailModal(false);
  };

  async function changeNick() {
    try {
      if (state.newNick.length < 5) {
        topActions.showSnackbar('닉네임은 5자 이상이어야 해요', 0);
        return;
      }
      await actions.setLoading_profileEdit(true);

      await updateMyNickData(state.newNick)
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          await MyPageData();
          await actions.setLoading_profileEdit(false);
          if (res.DSdata.success === true) {
            topActions.showSnackbar(res.DSmessage, 1);
          } else {
            topActions.showSnackbar('닉네임 업데이트에 실패했어요', 0);
          }
        });
      actions.setNewNick('');
    } catch (err) {
      await actions.setLoading_profileEdit(false);
      const error = JSON.parse(err.message);
      if (error.DScode) {
        return;
      } else {
        await topActions.showSnackbar(
          '서버오류로 닉네임 업데이트에 실패했어요',
          0,
        );
        return;
      }
    }
  }

  /**
   *  프로필 사진 갤러리에서 가져와 크롭 하는 함수
   */
  const selectAndCropImage = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      // if (selectedImage) {
      //   actions.setImage(selectedImage.path);
      //   // await getProfileUrl();
      //   // uploadImageToServer(selectedImage.path);
      // }

      return selectedImage.path;
    } catch (error) {
      if (error.message !== 'User cancelled image picker') {
        console.warn('ImagePicker Error:', error);
      }
    }
  };

  /**
   *  프로필 사진을 업로드할 url을 가져오는 함수
   * @returns
   */
  async function getProfileUrl() {
    const res = await getProfileUpdataUrlData().then(res => {
      return topActions.setStateAndError(res);
    });
    return res.DSdata.url;
  }

  /**
   *  프로필 사진을 서버에 업로드하는 함수
   * @param {*} imagePath
   * @param {*} url
   * @returns
   */
  const uploadImageToServer = async (imagePath, url) => {
    let formData = new FormData();
    const imageBlob = await fetch(imagePath).then(response => response.blob());
    // 이미지 파일을 FormData에 추가
    formData.append('file', {
      uri: imagePath,
      type: 'image/jpeg', // 이미지 형식에 따라 변경
      name: 'upload.JPG', // 원하는 파일 이름으로 변경
    });

    // console.log('$$$$ : ', state.profileUrl);
    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: imageBlob,
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

      return 1;
    } catch (error) {
      return -1;
    }
  };

  /**
   *  프로필 사진 변경 버튼 누르면 시작되는 함수 갤러리에서 이미지를 가져와 크롭하고 서버에 업로드한다.
   */
  const NewImage = async () => {
    await selectAndCropImage()
      .then(async result => {
        await actions.setLoading_profileEdit(true);
        const image = result;
        const url = await getProfileUrl();
        return {image, url};
      })
      .then(async res => {
        return uploadImageToServer(res.image, res.url);
      })
      .then(async res => {
        await new Promise(resolve => setTimeout(resolve, 2500));
        await MyPageData();
        await actions.setLoading_profileEdit(false);
        // console.log('&&&: ', res);
        if (res === 1) {
          topActions.showSnackbar('이미지 업데이트에 성공했어요', 1);
        } else {
          topActions.showSnackbar('이미지 업데이트에 실패했어요', 0);
        }
      })
      .catch(async err => {
        await actions.setLoading_profileEdit(false);
        await topActions.showSnackbar(
          '서버오류로 이미지 업데이트에 실패했어요',
          0,
        );
      });
  };

  /**
   * 환불 계좌 드롭다운 메뉴를 보여주는 함수
   */
  async function changeBankDropDownVisible() {
    if (state.bankDropDownVisible == false) {
      await actions.setBankDropDownVisible(true);
    } else {
      await actions.setBankDropDownVisible(false);
    }
  }

  /**
   * 드롭다운에서 은행명 선택했을 때 선택사항 지정하는 함수
   * @param {*} bankName
   */
  async function selectBankName(bankName) {
    await actions.setNewBankName(bankName.bank_name);
    await actions.setSelectedBankCode(bankName.bank_code);
    await changeBankDropDownVisible();
  }

  /**
   * 계좌 정보를 서버에 업데이트하는 함수
   */
  async function storeAccountData() {
    try {
      // console.log(state.newAccount);
      // console.log(state.selectedBankCode);
      await actions.setLoading_profileEdit(true);

      await updateMyAccountData(state.newAccount, state.selectedBankCode)
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          await MyPageData();
          await actions.setLoading_profileEdit(false);
          // console.log('&&&: ', res);
          if (res.DSdata.success === true) {
            topActions.showSnackbar('계좌 정보 업데이트에 성공했어요', 1);
          } else {
            topActions.showSnackbar('계좌 정보 업데이트에 실패했어요', 0);
          }
        });
    } catch {
      await actions.setLoading_profileEdit(false);
      await topActions.showSnackbar(
        '서버오류로 계좌 정보 업데이트에 실패했어요',
        0,
      );
    }
  }

  async function storeAddress() {
    let address = state.address;
    let zonecode = state.zonecode;
    let detailAddress = state.detailAddress;

    if (address === null) {
      address = state.userData_profile.address;
    }
    if (zonecode === null) {
      zonecode = state.userData_profile.zonecode;
    }
    if (detailAddress === null || detailAddress === '') {
      detailAddress = state.userData_profile.detail_address;
    }

    try {
      await actions.setLoading_profileEdit(true);

      await updateMyAddressData(zonecode, address, detailAddress)
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          await MyPageData();
          await actions.setLoading_profileEdit(false);
          if (res.DSdata.success === true) {
            topActions.showSnackbar('주소 정보 업데이트에 성공했어요', 1);
          } else {
            topActions.showSnackbar('주소 정보 업데이트에 실패했어요', 0);
          }
        });
    } catch {
      await actions.setLoading_profileEdit(false);
      await topActions.showSnackbar(
        '서버오류로 주소 정보 업데이트에 실패했어요',
        0,
      );
    }
  }

  /**
   * 프로필 수정 화면에서 새로고침시 state 초기화하는 함수
   */
  async function editRefresh() {
    await actions.setLoading_profileEdit(true);
    await actions.setAddress('');
    await actions.setZonecode('');
    await actions.setDetailAddress('');
    await actions.setNewNick('');
    await actions.setNewBankName(null);
    await actions.setNewAccount(null);
    await actions.setSelectedBankCode(null);
    await actions.setBankDropDownVisible(false);
    await loadData();
    await actions.setLoading_profileEdit(false);
  }

  /**
   * 회원 탈퇴 함수
   */
  async function deleteUser_logeout() {
    try {
      await deleteUserData()
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'SignUpNavigator',
              },
            ],
          });
          if (res.DSdata.success === true) {
            topActions.showSnackbar('회원 탈퇴에 성공했어요', 1);
          } else {
            topActions.showSnackbar('회원 탈퇴에 실패했어요', 0);
          }
        });
    } catch {
      await topActions.showSnackbar('서버오류로 회원 탈퇴에 실패했어요', 0);
    }
  }

  /**
   * 로그아웃 함수
   */
  async function logout() {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'SignUpNavigator',
        },
      ],
    });
  }

  /**
   *  결제내역 상세 페이지에서 결제내역을 가져오는 함수
   * @param {str} merchant_uid
   */
  async function getHistoryPaymentData(merchant_uid) {
    try {
      await getImportPaymentData(merchant_uid)
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          // console.log('&&&: ', res);
          actions.setPaymentData(res.DSdata.data);
        });
    } catch {
      await topActions.showSnackbar(
        '서버오류로 결제 내역을 불러오는데 실패했어요',
        0,
      );
    }
  }

  /**
   * 결제 상세 내역 페이지 에서 환불 신청을 하는 함수
   * @param {int} tikkling_id
   * @param {str} merchant_uid
   */
  async function refundPayment(tikkling_id, merchant_uid) {
    try {
      await updateRefundMyPaymentData(tikkling_id, merchant_uid, '단순 변심')
        .then(async res => {
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          console.log('&&&: ', res);
          if (res.DSdata.success === true) {
            topActions.showSnackbar('환불 신청에 성공했어요', 1);
            actions.setPaymentData(null);
            loadData();
            navigation.goBack();
          } else {
            topActions.showSnackbar('환불 신청에 실패했어요', 0);
          }
        });
    } catch {
      await topActions.showSnackbar('서버오류로 환불 신청에 실패했어요', 0);
    }
  }

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
    },
    actions: {
      ...actions,
      MyPageData,
      formatDate,
      calculateDaysUntilNextBirthday,
      navigation,
      contractLink,
      privateDataLink,
      sendMail,
      refundPolicyLink,
      onRefresh,
      loadData,
      onCloseDetailModal,
      getProfileUrl,
      changeNick,
      selectAndCropImage,
      NewImage,
      changeBankDropDownVisible,
      selectBankName,
      storeAccountData,
      storeAddress,
      editRefresh,
      deleteUser_logeout,
      logout,
      getHistoryPaymentData,
      refundPayment,
    },
  };
};
