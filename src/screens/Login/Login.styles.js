import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px 16px 4px 16px;
  justify-content: space-between;
  background-color: #fff;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #222222;
  padding-top: 48px;
`;

export const Footer = styled.View`
  width: 100%;
`;

export const LoginBtn = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #ccc;
  padding: 17px 105px 17px 106px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

LoginBtn.Text = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #222;
`;
