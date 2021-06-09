import React from 'react';
import { Container, Heading, Message, RetryButton, RetryText } from './ErrorBox.styles';

const ErrorBox = ({ children }) => <Container>{children}</Container>;

ErrorBox.Heading = Heading;
ErrorBox.Message = Message;
ErrorBox.RetryButton = RetryButton;
ErrorBox.RetryText = RetryText;

export default ErrorBox;
