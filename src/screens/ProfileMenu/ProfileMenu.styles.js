import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 16px;
  z-index: 1;
`;

export const FavoriteTags = styled.View`
  padding: 24px 0;
  margin-top: 40px;
`;

FavoriteTags.Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

FavoriteTags.Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

FavoriteTags.Menu = styled.Text`
  font-size: 12px;
  color: #a7a7a7;
`;

FavoriteTags.List = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ empty }) => (empty ? 'center' : 'flex-start')};
  flex-wrap: ${({ empty }) => (empty ? '' : 'wrap')};
  height: ${({ empty }) => (empty ? '72px' : 'auto')};
  background-color: ${({ empty }) => (empty ? '#fafafa' : 'transparent')};
`;

FavoriteTags.EmptyText = styled.Text`
  font-size: 12px;
`;

export const Tag = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 8px 0;
`;

Tag.SeparatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

Tag.Separator = styled.View`
  width: 1px;
  height: 12px;
  margin: 0 8px;
  background-color: #cccccc;
`;

Tag.Icon = styled.View`
  margin-right: 4px;
`;

Tag.Name = styled.Text`
  font-size: 12px;
`;

export const Menu = styled.View``;

Menu.Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

Menu.Icon = styled.View`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

Menu.Text = styled.Text`
  font-size: 14px;
`;

export const Line = styled.View`
  width: 100%;
  height: 0;
  border-top-width: 1px;
  border-style: solid;
  border-color: #f0f0f0;
  margin-top: 16px;
  margin-bottom: 16px;
`;
