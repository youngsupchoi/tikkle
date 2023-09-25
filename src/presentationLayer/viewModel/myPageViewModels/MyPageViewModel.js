import {useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {CONTRACT_URL, PRIVATECONTRACT_URL, REFUNDPOLICY_URL} from '@env';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMyPageViewState} from '../../viewState/myPageStates/MyPageState';

// 2. 데이터 소스 또는 API 가져오기

import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {getMyEndTikklingData} from 'src/dataLayer/DataSource/User/GetMyEndTikklingData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getMyPaymentData} from 'src/dataLayer/DataSource/User/GetMyPaymentData';
import {getMyPageScreenData} from 'src/dataLayer/DataSource/User/GetMyPageScreenData';
import {useNavigation} from '@react-navigation/native'; // 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {getProfileUpdataUrlData} from 'src/dataLayer/DataSource/User/GetProfileUpdataUrlData';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';
import {updateMyNickData} from 'src/dataLayer/DataSource/User/UpdateMyNickData';
import ImagePicker from 'react-native-image-crop-picker';

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
        .then(res => {
          actions.setUserData_profile(res.DSdata.user_info);
          actions.setNewAccount(res.DSdata.user_info.account);
          actions.setEndTikklingData(res.DSdata.end_tikkling);
          actions.setPaymentHistoryData(res.DSdata.payment);
        });
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in MyPageViewModel's get_user_info]\n", error);
    }
  }

  const loadData = async () => {
    try {
      await actions.setLoading_profile(true);
      await getMyPageScreenData().then(res => {
        actions.setUserData_profile(res.DSdata.user_info);
        actions.setNewBankName(res.DSdata.user_info.bank_name);
        actions.setEndTikklingData(res.DSdata.end_tikkling);
        actions.setPaymentHistoryData(res.DSdata.payment);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await actions.setLoading_profile(false);
    }
  };

  const onRefresh = async () => {
    await actions.setRefreshing(true);
    await loadData();
    await actions.setRefreshing(false);
  };

  /**
   * MyPageScreen에서 날짜 데이터 포멧하는 함수
   * @param {String (date)} isoDateString
   * @returns
   */
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed, hence +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   *  MyPageScreen에서 생일까지 남은 날짜를 계산하는 함수
   * @param {string(date)} birthdayString
   * @returns
   */
  function calculateDaysUntilNextBirthday(birthdayString) {
    const todayTemp = getKoreanDate();
    const todayStr = todayTemp.toISOString();
    const todayYear = parseInt(todayStr.slice(0, 4));
    const todayMonth = parseInt(todayStr.slice(5, 7));
    const todayDay = parseInt(todayStr.slice(8, 10));
    const birthMonth = parseInt(birthdayString.slice(5, 7));
    const birthDay = parseInt(birthdayString.slice(8, 10));

    // Calculate the next birthday for this yeard
    let currentYearBirthday = new Date(
      `${todayYear}-${birthMonth}-${birthDay}`,
    );

    const today = new Date(`${todayYear}-${todayMonth}-${todayDay}`);

    console.log('currentYearBirthday : ', currentYearBirthday);
    console.log('today : ', today);

    // Calculate the time difference in milliseconds
    const timeDifference =
      (currentYearBirthday - today) / (1000 * 60 * 60 * 24);
    console.log('timeDiff : ', timeDifference);

    if (timeDifference == 0) {
      return `오늘은 생일이애요!`;
    } else if (timeDifference < 0) {
      currentYearBirthday = new Date(
        `${todayYear + 1}-${birthMonth}-${birthDay}`,
      );
    }

    const timeUntilNextBirthday = Math.floor(
      (currentYearBirthday - today) / (1000 * 60 * 60 * 24),
    );
    return `생일이 ${timeUntilNextBirthday}일 남았어요.`;
  }

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
    await updateMyNickData(state.newNick)
      .then(res => {
        //console.log(res);
        return topActions.setStateAndError(res);
      })
      .then(res => {
        topActions.showSnackbar(res.DSmessage, 1);
      });
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

      // console.log(response);

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
        await new Promise(resolve => setTimeout(resolve, 2000));
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
    await actions.setNewBankName(bankName);
    await changeBankDropDownVisible();
  }

  async function storeAccountData() {
    console.log('storeAccountData');
    console.log(state.newBankName);
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
    },
  };
};
