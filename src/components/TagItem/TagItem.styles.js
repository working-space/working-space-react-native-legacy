import styled from '@emotion/native';

export const Item = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
`;

Item.TagIcon = styled.View`
  padding: 16px;
  border-radius: 64px;
  border: solid 1px #cccccc;
`;

Item.checkIcon = styled.View`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: #ffbb44;
  border-radius: 20px;
`;

Item.TagName = styled.Text`
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  padding-top: 12px;
`;
