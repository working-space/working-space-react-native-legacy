import React, { useState, useCallback } from 'react';
import { Container, InputBox } from './InputText.styles';
import SmallCloseIcon from '~/assets/icons/icon_small_close.svg';

const InputText = ({ defaultText, onSetNickname, inputRef }) => {
  const [nickname, setNickname] = useState(defaultText);
  const handleSetNickname = useCallback(
    (text) => {
      onSetNickname?.(text);
    },
    [onSetNickname],
  );

  return (
    <Container>
      <InputBox>
        <InputBox.Info>
          <InputBox.Text
            placeholder="이름을 입력해주세요"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
            onSubmitEditing={(event) => handleSetNickname(event.nativeEvent.text)}
            ref={inputRef}
          />
          <InputBox.CancelBtn onPress={() => handleSetNickname(defaultText)}>
            <SmallCloseIcon />
          </InputBox.CancelBtn>
        </InputBox.Info>
        <InputBox.underline />
      </InputBox>
    </Container>
  );
};

export default InputText;
