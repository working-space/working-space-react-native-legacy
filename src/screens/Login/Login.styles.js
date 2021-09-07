import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: #fff;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #222222;
  padding-top: 48px;
  text-align: center;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 16px 16px 4px 16px;
  margin-bottom: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 17px 105px 17px 106px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

LoginButton.Icon = styled.View`
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;

LoginButton.Text = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #222;
`;
