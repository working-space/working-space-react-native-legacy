import styled from '@emotion/native';

export const TagListWrapper = styled.View`
  width: 100%;
  flex: 1;
`;

export const TagListBox = styled.View`
  width: 100%;
  padding: 24px 0;
`;

TagListBox.Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 16px;
  padding-bottom: 24px;
`;

TagListBox.Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

TagListBox.Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #222222;
  padding-right: 15px;
`;

TagListBox.Count = styled.Text`
  font-size: 14px;
  color: #cccccc;
  padding-left: 7px;
`;

TagListBox.Button = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #3ea2ff;
`;

TagListBox.AllTags = styled.ScrollView`
  flex-direction: row;
  padding: 0;
`;
