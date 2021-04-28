import React from 'react';
import { NoneDataWrapper } from './NoneData.styles';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import EmptyIllustURL from '~/assets/images/empty_illust.jpg';

const NoneData = (props) => {
  return (
    <NoneDataWrapper>
      <AutoFitImage source={EmptyIllustURL} />
      <NoneDataWrapper.Text>{props.text}</NoneDataWrapper.Text>
    </NoneDataWrapper>
  );
};

export default NoneData;
