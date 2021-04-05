import styled from '@emotion/native';

export const ImageWrapper = styled.View`
  flex: 1;
  margin-top: 24px;
`;

export const CardImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

CardImage.Image = styled.Image`
  flex: 1;
  width: 100%;
`;

export const TotalView = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 16px;
  left: 0;
  right: 0;
`;

TotalView.Text = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 9;
`;

export const InfoBox = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.7);
`;

InfoBox.Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 14px;
`;

InfoBox.SubTitle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

InfoBox.SubInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
`;

InfoBox.Text = styled.Text`
  font-size: 12px;
  color: #fff;
  padding-left: 8px;
`;
