import styled from '@emotion/native';

export const Item = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 0;
`;

Item.TagIcon = styled.View`
  padding: 16px;
  border-radius: 64px;
  border-style: solid;
  border-width: 1px;
`;

Item.checkIcon = styled.View`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -1px;
  right: -1px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

Item.countText = styled.Text`
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  color: #ffffff;
`;

Item.TagName = styled.Text`
  width: 58px;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  padding-top: 12px;
`;
