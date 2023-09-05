import React from 'react';
import {B28} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_GRAY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export const InstructionText = () => (
  <>
    <B28>전화번호를 입력해주세요.</B28>
    <M15 customStyle={{color: COLOR_GRAY}}>
      가입된 전화번호가 있는지 확인해드릴게요:)
    </M15>
  </>
);
