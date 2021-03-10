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
  margin-bottom: 16px;
  justify-content: center;
`;

SearchInput.PlaceHolder = styled.Text`
  font-size: 14px;
  color: #a7a7a7;
`;

export const Card = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 99;
`;
