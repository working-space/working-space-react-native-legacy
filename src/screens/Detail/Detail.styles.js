import styled from '@emotion/native';

export const DetailWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

export const ErrorWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const LinkIconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

LinkIconWrapper.Item = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
`;

LinkIconWrapper.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #222222;
  padding-left: 4px;
`;

export const ModalEvaluation = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: space-between;
`;

ModalEvaluation.Header = styled.View`
  flex-direction: column;
  justify-content: flex-start;
`;

ModalEvaluation.Top = styled.View`
  align-items: flex-end;
  padding: 16px 0;
  padding-right: 16px;
`;

ModalEvaluation.Bottom = styled.View`
  align-items: flex-start;
  padding-top: 16px;
  padding-left: 16px;
`;

ModalEvaluation.Title = styled.Text`
  font-size: 18px;
  line-height: 26px;
  font-weight: bold;
  color: #222222;
`;

ModalEvaluation.CloseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

ModalEvaluation.SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  justify-content: center;
  align-items: center;
`;

ModalEvaluation.Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
`;
