import styled, { css } from '@emotion/native';

const row = css`
  flex-direction: row;
  align-items: center;
`;

export const Item = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 16px;
  background-color: white;
  margin-bottom: 8px;
`;

Item.BadgeList = styled.View`
  ${row};
  margin-bottom: 8px;
`;

Item.Badge = styled.View`
  background-color: #ffbb44;
  padding: 0 2px;
  margin-right: 8px;
`;

Item.BadgeText = styled.Text`
  color: white;
  font-size: 11px;
  font-weight: bold;
`;

Item.Header = styled.View`
  ${row}
  justify-content: space-between;
  margin-bottom: 8px;
`;

Item.HeaderRight = styled.View`
  ${row}
`;

Item.Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  position: relative;
`;

Item.Distance = styled.Text`
  font-size: 12px;
  margin-left: 4px;
`;

Item.Address = styled.Text`
  font-size: 11px;
  color: #a7a7a7;
  margin-bottom: 8px;
`;

Item.Tag = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

Item.TagSeparatorContainer = styled.View`
  ${row}
`;

Item.TagSeparator = styled.View`
  width: 1px;
  height: 12px;
  margin: 0 8px;
  background-color: #cccccc;
`;

Item.TagIcon = styled.View`
  margin-right: 4px;
`;

Item.TagName = styled.Text`
  font-size: 11px;
`;

Item.InfoList = styled.View`
  ${row}
`;

Item.Info = styled.View`
  ${row}
  margin-right: 16px;
`;

Item.InfoCount = styled.Text`
  margin-left: 4px;
  font-size: 12px;
`;
