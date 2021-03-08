import styled from '@emotion/native';

export const DetailInfoWrapper = styled.View`
  padding: 0 16px;
`;

export const DetailInfoBox = styled.View`
  flex-direction: column;
  padding: 24px 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #f0f0f0;
`;

DetailInfoBox.Item = styled.View`
  flex-direction: row;
  padding-bottom: 12px;
`;

DetailInfoBox.Title = styled.Text`
  width: 77px;
  font-size: 12px;
  font-weight: bold;
  color: #a7a7a7;
`;

DetailInfoBox.Text = styled.Text`
  font-size: 12px;
  color: #222222;
`;

DetailInfoBox.Wrapper = styled.View`
  flex-direction: column;
`;

DetailInfoBox.Copy = styled.TouchableOpacity`
  flex: 1;
`;
