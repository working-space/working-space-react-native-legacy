import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { isEmpty } from 'lodash';
import { CommentListWrapper, CommentListBox, CommentItem, CommentMoreButton, CommentItemTitle, ProfileImage, CommentText, NoneItem } from './CommentList.styles';
import SmallPersonFillIcon from '~/assets/icons/icon_small_person_fill.svg';
import DropdownIcon from '~/assets/icons/icon_dropdown.svg';
import NoneImage from '~/assets/images/none-image.svg';
import OptionIcon from '~/assets/icons/icon-option.svg';

const CommentList = (props) => {
  const { comments, hasNextComments, userComments, onSetCommentTextModal, onMoreCommentsButtonClick } = props;
  const handleCommentTextModal = useCallback(() => {
    onSetCommentTextModal?.();
  }, [onSetCommentTextModal]);

  const handleMoreCommentsButtonClick = useCallback(() => {
    onMoreCommentsButtonClick?.();
  }, [onMoreCommentsButtonClick]);

  return (
    <CommentListWrapper>
      <CommentListBox>
        <CommentListBox.Header>
          <CommentListBox.Title>댓글</CommentListBox.Title>
          <SmallPersonFillIcon />
          <CommentListBox.Count>{isEmpty(comments) ? 0 : comments.length}</CommentListBox.Count>
        </CommentListBox.Header>
        <CommentListBox.Input onPress={handleCommentTextModal}>
          <ProfileImage>
            <SmallPersonFillIcon />
          </ProfileImage>
          <CommentText>
            <CommentText.Holder>댓글 입력하기</CommentText.Holder>
          </CommentText>
        </CommentListBox.Input>
        {isEmpty(comments) ? (
          <NoneItem>
            <NoneImage />
            <NoneItem.Text>첫 댓글을 작성해보세요!</NoneItem.Text>
          </NoneItem>
        ) : (
          <>
            <CommentListBox.View>
              {comments.map((comment, i) => {
                return (
                  <CommentItem key={i}>
                    <ProfileImage>
                      <SmallPersonFillIcon />
                    </ProfileImage>
                    <CommentItem.Info>
                      <CommentItemTitle>
                        <CommentItemTitle.left>
                          <CommentItemTitle.Name>{comment.user_id}</CommentItemTitle.Name>
                          <CommentItemTitle.Date>{comment.update_dt}</CommentItemTitle.Date>
                        </CommentItemTitle.left>
                        {userComments !== null &&
                          userComments.map((userComment) => {
                            return (
                              comment.id === userComment.id && (
                                <TouchableOpacity key={userComment.id}>
                                  <OptionIcon />
                                </TouchableOpacity>
                              )
                            );
                          })}
                      </CommentItemTitle>
                      <CommentItem.Text>{comment.content}</CommentItem.Text>
                    </CommentItem.Info>
                  </CommentItem>
                );
              })}
            </CommentListBox.View>
            {hasNextComments && (
              <CommentMoreButton onPress={handleMoreCommentsButtonClick}>
                <DropdownIcon />
                <CommentMoreButton.Text>더보기</CommentMoreButton.Text>
              </CommentMoreButton>
            )}
          </>
        )}
      </CommentListBox>
    </CommentListWrapper>
  );
};

export default CommentList;
