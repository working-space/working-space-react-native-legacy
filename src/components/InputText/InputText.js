import React, { useState, useCallback } from 'react';
import { Container, InputBox } from './InputText.styles';
import SmallCloseIcon from '~/assets/icons/icon_small_close.svg';

const InputText = ({ defaultText, onSetNickname }) => {
  const [nickname, setNickname] = useState('');
  const handleSetNickname = useCallback(
    (text) => {
      onSetNickname?.(text);
    },
    [onSetNickname],
  );

  return (
    <Container>
      <InputBox>
        <InputBox.Text placeholder="이름을 입력해주세요" value={nickname} onChangeText={(text) => setNickname(text)} onSubmitEditing={(event) => handleSetNickname(event.nativeEvent.text)} />
        <InputBox.CancelBtn>
          <SmallCloseIcon />
        </InputBox.CancelBtn>
      </InputBox>
    </Container>
  );
};

export default InputText;
