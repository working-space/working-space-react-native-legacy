import styled from '@emotion/native';

export const Container = styled.View`
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 16px 0;
`;

Header.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Item = styled.TouchableOpacity`
  padding: 14px 0;
  margin: 0 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  border-style: solid;
  flex-direction: row;
  align-items: center;
`;

Item.Text = styled.Text`
  margin-left: 16px;
  font-size: 12px;
`;

export const SubmitButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  padding: 16px 0;
`;

SubmitButton.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
