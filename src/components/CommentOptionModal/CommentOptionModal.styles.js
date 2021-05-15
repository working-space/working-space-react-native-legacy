import styled from '@emotion/native';

export const CommentOptionWrapper = styled.View`
  width: 70%;
  flex-direction: column;
  background-color: #fff;
  margin: 0 auto;
  elevation: 6;
`;

export const CommentOptionItem = styled.TouchableOpacity`
  padding: 16px;
`;

CommentOptionItem.Text = styled.Text`
  font-size: 14px;
  color: #000;
`;
