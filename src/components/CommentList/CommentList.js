import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CommentListWrapper, CommentListBox, CommentItem, CommentMoreButton, CommentItemTitle, ProfileImage, CommentText } from './CommentList.styles';
import SmallPersonFillIcon from '~/assets/icons/icon_small_person_fill.svg';
import DropdownIcon from '~/assets/icons/icon_dropdown.svg';
import { useCallback } from 'react';

const CommentList = (props) => {
  const { comments, onSetCommentTextModal } = props;

  const handleCommentTextModal = useCallback(() => {
    onSetCommentTextModal?.();
  }, [onSetCommentTextModal]);

  return (
    <CommentListWrapper>
      <CommentListBox>
        <CommentListBox.Header>
          <CommentListBox.Title>댓글</CommentListBox.Title>
          <SmallPersonFillIcon />
          <CommentListBox.Count>{comments.length}</CommentListBox.Count>
        </CommentListBox.Header>
        <CommentListBox.Input onPress={handleCommentTextModal}>
          <ProfileImage>
            <SmallPersonFillIcon />
          </ProfileImage>
          <CommentText>
            <CommentText.Holder>댓글 입력하기</CommentText.Holder>
          </CommentText>
        </CommentListBox.Input>
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
                      <CommentItemTitle.Name>{comment.name}</CommentItemTitle.Name>
                      <CommentItemTitle.Date>{comment.date}</CommentItemTitle.Date>
                    </CommentItemTitle.left>
                    <TouchableOpacity>
                      <Text>...</Text>
                    </TouchableOpacity>
                  </CommentItemTitle>
                  <CommentItem.Text>{comment.text}</CommentItem.Text>
                </CommentItem.Info>
              </CommentItem>
            );
          })}
        </CommentListBox.View>
        <CommentMoreButton>
          <DropdownIcon />
          <CommentMoreButton.Text>더보기</CommentMoreButton.Text>
        </CommentMoreButton>
      </CommentListBox>
    </CommentListWrapper>
  );
};

CommentList.defaultProps = {
  comments: [
    { name: '프로작업러', date: '2020.10.23 21:13', text: '콘센트는 많은데 사람도 많아요ㅎㅎㅎㅎ 시간 잘 맞춰서 오면 사람 적당히 없습니다. 작업하기엔 나쁘진 않아요.' },
    { name: '캠공족', date: '2020.10.23 21:13', text: '콘센트는 많은데 사람도 많아요ㅎㅎㅎㅎ 시간 잘 맞춰서 오면 사람 적당히 없습니다. 작업하기엔 나쁘진 않아요.' },
    { name: '카공족', date: '2020.10.23 21:13', text: '콘센트는 많은데 사람도 많아요ㅎㅎㅎㅎ 시간 잘 맞춰서 오면 사람 적당히 없습니다. 작업하기엔 나쁘진 않아요.' },
    { name: '근로자', date: '2020.10.23 21:13', text: '콘센트는 많은데 사람도 많아요ㅎㅎㅎㅎ 시간 잘 맞춰서 오면 사람 적당히 없습니다. 작업하기엔 나쁘진 않아요.' },
  ],
};

export default CommentList;
