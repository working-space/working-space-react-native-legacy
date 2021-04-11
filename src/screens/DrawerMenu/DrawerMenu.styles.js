import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 56px;
  padding: 0 16px;
  z-index: 1;
`;

export const Profile = styled.View`
  padding: 16px 0;
  align-items: center;
`;

Profile.Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #cccccc;
  margin-bottom: 24px;
`;

Profile.Title = styled.Text`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
`;

Profile.Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const FavoriteTags = styled.View`
  padding: 24px 0;
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
