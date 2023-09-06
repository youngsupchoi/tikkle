import bcrypt from 'react-native-bcrypt';

export async function checkOtpData(encryptOTP, inputOTP) {
  const isMatch = bcrypt.compareSync(inputOTP, encryptOTP);
  let ret = null;

  if (isMatch) {
    ret = true;
  } else {
    ret = false;
  }

  if (ret === null) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: 'OTP 확인 중 오류가 발생했어요. 다시 시도해주세요.',
    };
  }

  return {
    DScode: 0,
    DSdata: {verified: ret},
    DSmessage: 'OTP 확인에 성공했어요.',
  };
}
