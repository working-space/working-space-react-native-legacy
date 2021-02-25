import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 56px;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 0 12px;
  margin: 8px 16px;
`;

export const ResultContainer = styled.View`
  flex: 1;
  margin: 16px 0;
`;

export const TabContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: center;
`;

export const Tab = styled.TouchableOpacity`
  padding: 0 20px;
  z-index: 10;
`;

Tab.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ active }) => (active ? '#000000' : '#a7a7a7')};
  padding-bottom: 8px;
`;

Tab.BottomLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #222222;
`;

export const ResultList = styled.ScrollView`
  flex: 1;
  background-color: ${({ active }) => (active ? '#ffffff' : '#f0f0f0')};
  border-style: solid;
  border-top-width: ${({ active }) => (active ? '1px' : '0')};
  border-top-color: #cccccc;
  margin-top: -1px;
  z-index: 9;
`;

ResultList.Item = styled.TouchableOpacity`
  padding: 16px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

ResultList.Text = styled.Text`
  font-size: 14px;
`;

export const SearchGuide = styled.View`
  padding: 24px 16px;
`;

SearchGuide.Text = styled.Text`
  font-size: ${({ small }) => (small ? '12px' : '14px')};
  line-height: 24px;
  color: ${({ small }) => (small ? '#a7a7a7' : '#000000')};
  margin-bottom: 8px;
`;
