import React, { useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  Dimensions,
  Text,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import {
  Container,
  SearchInput,
  HeaderText,
  FilterChangeButton,
  FilterSelect,
  CafeListContainer,
  Dimmed,
} from './Main.styles';
import FILTER from '~/constants/filter';
import dummyIllustURL from '~/assets/images/dummy_illust.jpg';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import MapIcon from '~/assets/icons/icon_map.svg';
import DropDownArrowIcon from '~/assets/icons/icon_dropdown_arrow.svg';
import { css } from '@emotion/native';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Main = ({ navigation }) => {
  const { AuthStore } = useStore();
  const { logout } = AuthStore;
  const [nowFilter, setNowFilter] = useState(FILTER.NEAREST);
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cafeList, setCafeList] = useState([
    {
      id: '0',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: ['PARKING_LOT', 'CLEAN_TOILET', 'CONCENT', 'TWENTY_FOUR'],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '1',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: ['PARKING_LOT', 'CLEAN_TOILET', 'CONCENT', 'TWENTY_FOUR'],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '2',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: ['PARKING_LOT', 'CLEAN_TOILET', 'CONCENT', 'TWENTY_FOUR'],
      favoriteCount: 10,
      commentCount: 19,
    },
  ]);

  const handleToggleSelectingFilter = () => {
    setIsSelectingFilter((prevState) => !prevState);
  };

  const handleSelectFilter = (filter) => {
    setNowFilter(filter);
    setIsSelectingFilter(false);
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <Header
        left={
          <Header.Button onPress={navigation.openDrawer}>
            <MenuIcon />
          </Header.Button>
        }
        right={
          <>
            <FilterChangeButton onPress={handleToggleSelectingFilter}>
              <FilterChangeButton.Text active={isSelectingFilter}>
                {nowFilter} 순
              </FilterChangeButton.Text>
              <DropDownArrowIcon />
            </FilterChangeButton>
            <Header.Button onPress={() => navigation.navigate('Map')}>
              <MapIcon />
            </Header.Button>
          </>
        }
        bottom={
          isSelectingFilter && (
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
          )
        }
      />
      {isSelectingFilter && (
        <Dimmed activeOpacity={1} onPress={handleToggleSelectingFilter}>
          <Dimmed.Area />
        </Dimmed>
      )}
      <Container>
        <FlatList
          contentContainerStyle={css`
            margin: 0 16px;
          `}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={cafeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CafeListItem data={item} />}
          ListHeaderComponent={() => (
            <>
              <SearchInput onPress={() => navigation.navigate('Search')}>
                <SearchInput.PlaceHolder>
                  현위치 : 서울시 서초구 양재천로 131 4층
                </SearchInput.PlaceHolder>
              </SearchInput>
              <HeaderText>
                망원동에서{'\n'}
                가장 {nowFilter} 곳
              </HeaderText>
              <AutoFitImage source={dummyIllustURL} />
            </>
          )}
        />
      </Container>
    </>
  );
};

export default observer(Main);
