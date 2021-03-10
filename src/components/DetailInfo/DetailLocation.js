import React from 'react';
import { Text } from 'react-native';
import { DetailLocationWrapper, DetailLocationBox, Title, LocationMap } from './DetailLocation.styles';

const DetailLocation = () => {
  return (
    <DetailLocationWrapper>
      <DetailLocationBox>
        <Title>위치</Title>
        <LocationMap>
          <Text>Location</Text>
        </LocationMap>
      </DetailLocationBox>
    </DetailLocationWrapper>
  );
};

export default DetailLocation;
