import styled from '@emotion/native';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 8px;
  z-index: 12;
  background-color: #ffffff;
`;

Container.Top = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 16px;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
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
