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
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
`;

InputBox.Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
`;

InputBox.Text = styled.TextInput`
  width: 88%;
  font-size: 18px;
  color: #222;
  padding: 0;
`;

InputBox.CancelBtn = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: #ccc;
  padding: 2px;
  margin-left: 16px;
  border-radius: 20px;
`;

InputBox.underline = styled.View`
  width: 100%;
  height: 17px;
  background-color: #fff;
  padding: 0 16px;
  border-top-width: 1px;
  border-style: solid;
  border-color: #222222;
`;
