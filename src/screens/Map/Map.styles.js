import styled, { css } from '@emotion/native';
import { Button as FloatingActionButton } from '~/components/FloatingActionButton/FloatingActionButton.styles';

const AbsoluteRight = css`
  position: absolute;
  right: 0;
`;

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

export const BottomView = styled.View`
  left: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 2;
`;

BottomView.Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 84px;
`;

BottomView.RowItem = styled.View`
  justify-content: center;
  margin: 16px;

  ${({ align }) => align === 'right' && AbsoluteRight};
`;

export const Card = styled.View`
  width: 100%;
  background-color: #ffffff;
  z-index: 99;
`;

export const MapButton = styled(FloatingActionButton)`
  justify-content: center;
`;

MapButton.Text = styled.Text`
  padding: 4px 24px;
  font-size: 12px;
`;

export const MapContainer = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
  z-index: 3;
`;
