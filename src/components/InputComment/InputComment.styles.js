import styled from '@emotion/native';

export const Container = styled.View`
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
  height: 63px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
  border-top-width: 1px;
  border-style: solid;
  border-color: #cccccc;
`;

InputBox.Text = styled.TextInput`
  width: 88%;
  font-size: 18px;
  color: #222;
`;

InputBox.CancelBtn = styled.View`
  width: 20px;
  height: 20px;
  background-color: #ccc;
  padding: 2px;
  margin-left: 16px;
  border-radius: 20px;
`;
