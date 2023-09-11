import bcrypt from 'react-native-bcrypt';

export async function checkOtpData(encryptOTP, inputOTP) {
  const isMatch = bcrypt.compareSync(inputOTP, encryptOTP);
  let ret = null;
  let returnMessage;

  if (isMatch) {
    ret = true;
    returnMessage = 'OTP가 일치해요.';
  } else {
    ret = false;
    returnMessage = 'OTP가 일치하지 않아요.';
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
    DSmessage: returnMessage,
  };
}
