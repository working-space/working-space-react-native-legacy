import React, { useState, useCallback } from 'react';
import { Container, InputBox } from './InputComment.styles';
import SmallCameraLineIcon from '~/assets/icons/icon_small_camera_line.svg';

const InputComment = ({ onSetCommentText, inputRef }) => {
  const [comment, setComment] = useState('');
  const handleSetCommentText = useCallback(
    (text) => {
      onSetCommentText?.(text);
    },
    [onSetCommentText],
  );

  return (
    <Container>
      <InputBox>
        <InputBox.Text
          placeholder="댓글을 입력하세요"
          value={comment}
          onChangeText={(text) => setComment(text)}
          onSubmitEditing={(event) => handleSetCommentText(event.nativeEvent.text)}
          ref={inputRef}
        />
        <InputBox.SubmitBtn>
          <SmallCameraLineIcon width="18" height="18" />
        </InputBox.SubmitBtn>
      </InputBox>
    </Container>
  );
};

export default InputComment;
