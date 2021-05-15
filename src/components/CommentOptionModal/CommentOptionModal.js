import React, { useCallback } from 'react';
import { CommentOptionWrapper, CommentOptionItem } from './CommentOptionModal.styles';

const CommentOptionModal = (props) => {
  const { onDeleteComment } = props;

  const handleDeleteComment = useCallback(() => {
    onDeleteComment?.();
  }, [onDeleteComment]);

  return (
    <CommentOptionWrapper>
      <CommentOptionItem onPress={handleDeleteComment}>
        <CommentOptionItem.Text>삭제하기</CommentOptionItem.Text>
      </CommentOptionItem>
    </CommentOptionWrapper>
  );
};

export default CommentOptionModal;
