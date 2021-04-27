import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 56px;
  padding: 16px;
  z-index: 1;
`;

export const TextButton = styled.TouchableOpacity`
  padding: 8px 0;
`;

TextButton.Text = styled.Text`
  font-size: 14px;
  color: #000;
`;

export const Line = styled.View`
  width: 100%;
  height: 0;
  border-top-width: 1px;
  border-style: solid;
  border-color: #f0f0f0;
  margin-top: 8px;
  margin-bottom: 8px;
`;
