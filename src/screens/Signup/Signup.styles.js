import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #222222;
  padding-top: 48px;
  padding-bottom: 60px;
`;

export const ModalView = styled.ScrollView`
  flex: 1 1 auto;
  width: 100%;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  padding-bottom: 28px;
  background-color: #fff;
`;

export const FooterBtn = styled.TouchableOpacity`
  border-radius: 24px;
  padding: 14px 24px;
`;

FooterBtn.Text = styled.Text`
  font-size: 11px;
  line-height: 15px;
  color: #ccc;
`;

FooterBtn.Prev = styled.Text`
  color: #a7a7a7;
`;

FooterBtn.Next = styled.Text`
  color: #222222;
`;
