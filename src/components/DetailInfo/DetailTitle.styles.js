import styled from '@emotion/native';

export const DetailTitleWrapper = styled.View`
  flex: 1;
  padding: 0 16px;
  padding-top: 56px;
`;

export const HeadTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 12px;
`;

export const TitleInfo = styled.View`
  flex-direction: row;
`;

TitleInfo.Item = styled.View`
  flex-direction: row;
  justify-content: center;
`;

TitleInfo.Text = styled.Text`
  font-size: 12px;
  padding-left: 4px;
`;
