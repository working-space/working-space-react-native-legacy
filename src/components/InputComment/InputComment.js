import React, { useState, useCallback } from 'react';
import { Container, InputBox } from './InputComment.styles';
import SmallCloseIcon from '~/assets/icons/icon_small_close.svg';

const InputComment = ({ onSetComment }) => {
  const [comment, setComment] = useState('');
  const handleSetComment = useCallback(
    (text) => {
      onSetComment?.(text);
    },
    [onSetComment],
  );

  return (
    <Container>
      <InputBox>
        <InputBox.Text placeholder="댓글을 입력하세요" value={comment} onChangeText={(text) => setComment(text)} onSubmitEditing={(event) => handleSetComment(event.nativeEvent.text)} />
        <InputBox.CancelBtn>
          <SmallCloseIcon />
        </InputBox.CancelBtn>
      </InputBox>
    </Container>
  );
};

export default InputComment;
