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
  padding-right: 16px;
`;
