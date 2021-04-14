import React from 'react';
import { isEmpty } from 'lodash';
import { DetailInfoWrapper, DetailInfoBox } from './DetailInfo.styles';

const DetailInfo = (props) => {
  const { address, hours, closed, phone } = props;
  const noneText = '정보없음';

  const handleCopyToClipboard = (address) => {
    console.log('copy: ', address);
  };

  return (
    <DetailInfoWrapper>
      <DetailInfoBox>
        <DetailInfoBox.Item>
          <DetailInfoBox.Title>주소</DetailInfoBox.Title>
          {isEmpty(address) ? (
            <DetailInfoBox.Text>{noneText}</DetailInfoBox.Text>
          ) : (
            <DetailInfoBox.Copy onPress={() => handleCopyToClipboard(address)}>
              <DetailInfoBox.Text>{address}</DetailInfoBox.Text>
            </DetailInfoBox.Copy>
          )}
        </DetailInfoBox.Item>
        <DetailInfoBox.Item>
          <DetailInfoBox.Title>영업시간</DetailInfoBox.Title>
          {isEmpty(hours) ? (
            <DetailInfoBox.Text>{noneText}</DetailInfoBox.Text>
          ) : (
            <DetailInfoBox.Wrapper>
              {hours?.map((h, i) => (
                <DetailInfoBox.Text key={i}>{h}</DetailInfoBox.Text>
              ))}
            </DetailInfoBox.Wrapper>
          )}
        </DetailInfoBox.Item>
        <DetailInfoBox.Item>
          <DetailInfoBox.Title>휴무일</DetailInfoBox.Title>
          {isEmpty(closed) ? <DetailInfoBox.Text>{noneText}</DetailInfoBox.Text> : <DetailInfoBox.Text>{closed}</DetailInfoBox.Text>}
        </DetailInfoBox.Item>
        <DetailInfoBox.Item>
          <DetailInfoBox.Title>전화번호</DetailInfoBox.Title>
          {isEmpty(phone) ? <DetailInfoBox.Text>{noneText}</DetailInfoBox.Text> : <DetailInfoBox.Text>{phone}</DetailInfoBox.Text>}
        </DetailInfoBox.Item>
      </DetailInfoBox>
    </DetailInfoWrapper>
  );
};

DetailInfo.defaultProps = {
  address: null,
  hours: null,
  closed: null,
  phone: null,
};

export default DetailInfo;
