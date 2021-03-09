import styled from '@emotion/native';

export const DetailWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

export const LinkIconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

LinkIconWrapper.Item = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
`;

LinkIconWrapper.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #222222;
  padding-left: 4px;
`;
