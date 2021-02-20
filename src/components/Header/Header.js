import React from 'react';
import { View } from 'react-native';
import {
  Container,
  RightSide,
  IconButton,
  FilterSelect,
} from './Header.styles';
import FILTER from '~/constants/filter';

const HeaderButton = (props) => (
  <IconButton {...props}>{props.children}</IconButton>
);

const Header = (props) => {
  const {
    left,
    right,
    nowFilter,
    setNowFilter,
    isSelectingFilter,
    setIsSelectingFilter,
  } = props;

  const handleSelectFilter = (filter) => {
    setNowFilter(filter);
    setIsSelectingFilter(false);
  };

  return (
    <Container>
      <Container.Top>
        <View>{left}</View>
        <RightSide>{right}</RightSide>
      </Container.Top>
      <View>
        {isSelectingFilter && (
          <FilterSelect>
            <FilterSelect.Item
              active={nowFilter === FILTER.NEAREST}
              onPress={() => handleSelectFilter(FILTER.NEAREST)}>
              <FilterSelect.Text active={nowFilter === FILTER.NEAREST}>
                {FILTER.NEAREST} 순
              </FilterSelect.Text>
            </FilterSelect.Item>
            <FilterSelect.Item
              active={nowFilter === FILTER.MANY_COMMENTS}
              onPress={() => handleSelectFilter(FILTER.MANY_COMMENTS)}>
              <FilterSelect.Text active={nowFilter === FILTER.MANY_COMMENTS}>
                {FILTER.MANY_COMMENTS} 순
              </FilterSelect.Text>
            </FilterSelect.Item>
            <FilterSelect.Item
              active={nowFilter === FILTER.MANY_FAVORITES}
              onPress={() => handleSelectFilter(FILTER.MANY_FAVORITES)}>
              <FilterSelect.Text active={nowFilter === FILTER.MANY_FAVORITES}>
                {FILTER.MANY_FAVORITES} 순
              </FilterSelect.Text>
            </FilterSelect.Item>
          </FilterSelect>
        )}
      </View>
    </Container>
  );
};

Header.Button = HeaderButton;

export default Header;
