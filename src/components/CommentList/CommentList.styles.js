import styled from '@emotion/native';

export const CommentListWrapper = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

export const CommentListBox = styled.View`
  width: 100%;
  padding: 24px 0;
  border-top-width: 1px;
  border-style: solid;
  border-color: #f0f0f0;
`;

CommentListBox.Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

CommentListBox.Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #222222;
  padding-right: 15px;
`;

CommentListBox.Count = styled.Text`
  font-size: 14px;
  color: #cccccc;
  padding-left: 7px;
`;

CommentListBox.Input = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
`;

CommentListBox.View = styled.View`
  flex-direction: column;
`;

export const CommentText = styled.View`
  padding-left: 8px;
`;

CommentText.Holder = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #a7a7a7;
`;

export const CommentItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const ProfileImage = styled.View`
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  margin-right: 8px;
`;

CommentItem.Info = styled.View`
  width: 91%;
  flex-direction: column;
`;

export const CommentItemTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
`;

CommentItemTitle.left = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

CommentItemTitle.Name = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #222222;
  padding-right: 8px;
  border-right-width: 1px;
  border-style: solid;
  border-color: #f0f0f0;
`;

CommentItemTitle.Date = styled.Text`
  font-size: 11px;
  color: #a7a7a7;
  padding-left: 8px;
`;

CommentItem.Text = styled.Text`
  font-size: 12px;
  line-height: 15px;
  color: #222222;
`;

export const CommentMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

CommentMoreButton.Text = styled.Text`
  font-size: 11px;
  color: #a7a7a7;
  padding-left: 4px;
`;
