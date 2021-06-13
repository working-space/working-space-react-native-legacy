import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 56px;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  border: 1px solid ${({ isFocusing }) => (isFocusing ? '#222222' : '#cccccc')};
  border-radius: 20px;
  padding: 0 16px;
  margin: 24px 16px;
  font-size: 12px;
`;

export const ResultContainer = styled.View`
  flex: 1;
  margin: 16px 0;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 0 16px;
  margin-top: 8px;
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  z-index: 10;
  border-style: solid;
  border-bottom-width: 1px;
  border-color: ${({ active }) => (active ? '#ffbb44' : '#f0f0f0')};
  padding: 12px 0;
  align-items: center;
`;

Tab.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ active }) => (active ? '#000000' : '#a7a7a7')};
`;

Tab.BottomLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #222222;
`;

export const ResultList = styled.ScrollView`
  flex: 1;
  background-color: ${({ active }) => (active ? '#ffffff' : '#fafafa')};
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
  margin-top: 76px;
  align-items: center;
`;

SearchGuide.Text = styled.Text`
  font-size: ${({ small }) => (small ? '12px' : '14px')};
  line-height: 24px;
  color: ${({ small }) => (small ? '#cccccc' : '#a7a7a7')};
  margin-bottom: 8px;
  text-align: center;
`;
