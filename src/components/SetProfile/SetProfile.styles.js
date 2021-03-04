import styled from '@emotion/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const EditProfile = styled.View`
  width: 100px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 80px;
`;

export const EditImage = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

EditImage.Photo = styled.View`
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: #cccccc;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

EditImage.Icon = styled.View`
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: black;
  border-radius: 100px;
  z-index: 2;
`;

export const EditName = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

EditName.Text = styled.Text`
  font-size: 18px;
  text-decoration: underline;
  padding-right: 8px;
`;

EditName.Icon = styled.View`
  width: 16px;
  height: 16px;
`;
