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
  height: 56px;
`;

Container.Bottom = styled.View``;

export const IconButton = styled.TouchableOpacity`
  padding: 0 16px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;
