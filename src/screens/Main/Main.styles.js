import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 56px;
  z-index: 1;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 0 12px;
  margin: 0 16px;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #222222;
`;

export const FilterChangeButton = styled.TouchableOpacity``;

FilterChangeButton.Text = styled.Text`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: #222222;
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
