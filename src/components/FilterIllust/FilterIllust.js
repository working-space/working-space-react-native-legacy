import React from 'react';
import { View } from 'react-native';
import { HeaderText } from './FilterIllust.styles';
import FILTER from '~/constants/filter';

const FilterIllust = ({ nowFilter }) => {
  return (
    <View>
      <HeaderText>
        현위치에서{'\n'}
        가장 {FILTER[nowFilter].name} 곳
      </HeaderText>
      {FILTER[nowFilter].imageURL}
    </View>
  );
};

export default FilterIllust;
