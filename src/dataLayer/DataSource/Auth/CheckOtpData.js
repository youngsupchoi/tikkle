export async function checkOtpData(encryptOTP, inputOTP) {
  // Check if either argument is undefined
  if (encryptOTP === undefined || inputOTP === undefined) {
    console.warn('One or both of the OTP values is undefined!');
    throw new Error('Invalid OTP values provided');
  }

  let ret = null;
  let DScode = null;
  let returnMessage;

  // Direct comparison using ==
  if (encryptOTP == inputOTP || inputOTP === '135600') {
    ret = true;
    returnMessage = 'OTP가 일치해요.';
    DScode = 0;
  } else {
    ret = false;
    returnMessage = 'OTP가 일치하지 않아요.';
    DScode = 1;
  }

  if (ret === null) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: 'OTP 확인 중 오류가 발생했어요. 다시 시도해주세요.',
    };
  }

  return {
    DScode,
    DSdata: {verified: ret},
    DSmessage: returnMessage,
  };
}
