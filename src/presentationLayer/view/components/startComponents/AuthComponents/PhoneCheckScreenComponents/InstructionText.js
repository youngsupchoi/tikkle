import React from 'react';
import {
  B15,
  B20,
  B28,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export const InstructionText = ({phoneNumber, formatPhoneNumber}) => {
  const formattedNumber = formatPhoneNumber(phoneNumber);
  return (
    <>
      <M15 customStyle={{lineHeight: 32}}>
        {formattedNumber}로 인증번호가 전송되었습니다
      </M15>
      {/* {console.log(phoneNumber.phoneNumber, func)} */}
      <B20 customStyle={{lineHeight: 36, fontSize: 22}}>
        수신된 인증번호를 입력해주세요.
      </B20>
    </>
  );
};
