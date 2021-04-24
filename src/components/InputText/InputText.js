import React, { useState, useCallback } from 'react';
import { Container, InputBox, SubmitButton } from './InputText.styles';
import SmallCloseIcon from '~/assets/icons/icon_small_close.svg';
import SmallCameraLineIcon from '~/assets/icons/icon_small_camera_line.svg';

const InputText = ({ usage, defaultText, onSetInputText, inputRef }) => {
  const [inputText, setInputText] = useState(usage === 'nickname' ? defaultText : '');
  const handleSetInputText = useCallback(
    (text) => {
      onSetInputText?.(text);
    },
    [onSetInputText],
  );

  return (
    <Container>
      <InputBox>
        <InputBox.Info>
          <InputBox.Text
            placeholder={usage === 'nickname' ? '이름을 입력해주세요' : '댓글을 입력하세요'}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            onSubmitEditing={(event) => handleSetInputText(event.nativeEvent.text)}
            ref={inputRef}
          />
          {usage === 'nickname' ? (
            <InputBox.CancelButton onPress={() => handleSetInputText(defaultText)}>
              <SmallCloseIcon />
            </InputBox.CancelButton>
          ) : (
            <InputBox.PhotoButton>
              <SmallCameraLineIcon width="18" height="18" />
            </InputBox.PhotoButton>
          )}
          <SubmitButton onPress={() => handleSetInputText(inputText)}>
            <SubmitButton.Text>등록</SubmitButton.Text>
          </SubmitButton>
        </InputBox.Info>
      </InputBox>
    </Container>
  );
};

export default InputText;
