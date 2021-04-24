import styled from '@emotion/native';

export const Container = styled.KeyboardAvoidingView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  justify-content: flex-end;
`;

export const InputBox = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
`;

InputBox.Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #cccccc;
  border-style: solid;
  border-radius: 4px;
`;

InputBox.Text = styled.TextInput`
  width: 80%;
  font-size: 12px;
  color: #222;
  padding: 0 12px;
`;

InputBox.CancelButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-right: 10px;
  background-color: #ccc;
  border-radius: 20px;
`;

InputBox.PhotoButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-right: 10px;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: 8px 12px;
  border-left-width: 1px;
  border-color: #cccccc;
  border-style: solid;
`;

SubmitButton.Text = styled.Text`
  font-size: 12px;
  color: #cccccc;
`;
