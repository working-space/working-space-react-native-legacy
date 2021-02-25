import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 56px;
  z-index: 1;
`;

export const SearchInput = styled.TouchableOpacity`
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 12px;
  margin: 0 16px;
  margin-top: 8px;
  margin-bottom: 24px;
  justify-content: center;
`;

SearchInput.PlaceHolder = styled.Text`
  font-size: 14px;
  color: #a7a7a7;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #222222;
`;

export const ScrolledListHeader = styled.View`
  padding: 16px 16px 24px 16px;
  border-style: solid;
  border-color: #f0f0f0;
  border-bottom-width: 1px;
`;

ScrolledListHeader.Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const FilterChangeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

FilterChangeButton.Text = styled.Text`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: #222222;
  margin-right: 4px;
`;

export const FilterSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 34px 34px 34px;
`;

FilterSelect.Item = styled.TouchableOpacity`
  margin-right: 8px;
  padding: 12px 16px;
  border-radius: 20px;
  border: solid 1px ${({ active }) => (active ? '#ff9d33' : '#f0f0f0')};
`;

FilterSelect.Text = styled.Text`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

export const CafeListContainer = styled.View`
  margin: 24px 16px;
`;

export const Dimmed = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  z-index: 11;
  position: absolute;
  top: 0;
  left: 0;
`;

Dimmed.Area = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 34, 34, 0.1);
`;
