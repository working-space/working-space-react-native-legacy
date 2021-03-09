import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import { Container, SearchInput, HeaderText, ScrolledListHeader, FilterChangeButton, FilterSelect, Dimmed } from './Main.styles';
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
  const [showScrolledListHeader, setShowScrolledListHeader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cafeList, setCafeList] = useState([
    {
      id: '0',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'VARIOUS_DESSERTS', count: 13, isSelected: false },
        { id: 'SMOKING', count: 9, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
        { id: 'QUIET', count: 21, isSelected: false },
        { id: 'TWENTY_FOUR', count: 7, isSelected: false },
        { id: 'PARKING_LOT', count: 6, isSelected: false },
        { id: 'CLEAN_TOILET', count: 16, isSelected: false },
        { id: 'STUDY_ROOM', count: 5, isSelected: false },
      ],
      badges: ['EDITOR PICK', 'PARTNER'],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '1',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: [],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '2',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: [],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '3',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: ['EDITOR PICK', 'PARTNER'],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '4',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: [],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '5',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: [],
      favoriteCount: 10,
      commentCount: 19,
    },
    {
      id: '6',
      title: '캐틀앤비',
      distance: '3.5km',
      address: '서울 서대문구 신촌동 190-21',
      tags: [
        { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
        { id: 'FAST_WIFI', count: 13, isSelected: false },
        { id: 'MANY_SEATS', count: 11, isSelected: false },
        { id: 'TIME_LIMIT', count: 19, isSelected: false },
        { id: 'CONCENT', count: 8, isSelected: false },
      ],
      badges: [],
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

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleScroll = useCallback((event) => {
    const THRESHOLD = 300;
    // TODO: 스크롤 될 때마다 event가 과도하게 발생하므로 최적화 필요
    // TODO: showScrolledListHeader가 변경될 때마다 이미지가 깜빡거리는 문제 수정 필요
    if (event.nativeEvent.contentOffset.y >= THRESHOLD) {
      setShowScrolledListHeader(true);
    } else {
      setShowScrolledListHeader(false);
    }
  }, []);

  const handleCardLinkClick = useCallback(
    (card) => {
      console.log(card);
      navigation.navigate('Detail', { cardData: card });
    },
    [navigation],
  );

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
              <FilterChangeButton.Text active={isSelectingFilter}>{nowFilter} 순</FilterChangeButton.Text>
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
              <FilterSelect.Item active={nowFilter === FILTER.NEAREST} onPress={() => handleSelectFilter(FILTER.NEAREST)}>
                <FilterSelect.Text active={nowFilter === FILTER.NEAREST}>{FILTER.NEAREST} 순</FilterSelect.Text>
              </FilterSelect.Item>
              <FilterSelect.Item active={nowFilter === FILTER.MANY_COMMENTS} onPress={() => handleSelectFilter(FILTER.MANY_COMMENTS)}>
                <FilterSelect.Text active={nowFilter === FILTER.MANY_COMMENTS}>{FILTER.MANY_COMMENTS} 순</FilterSelect.Text>
              </FilterSelect.Item>
              <FilterSelect.Item active={nowFilter === FILTER.MANY_FAVORITES} onPress={() => handleSelectFilter(FILTER.MANY_FAVORITES)}>
                <FilterSelect.Text active={nowFilter === FILTER.MANY_FAVORITES}>{FILTER.MANY_FAVORITES} 순</FilterSelect.Text>
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
        <View>
          <SearchInput onPress={() => navigation.navigate('Search')}>
            <SearchInput.PlaceHolder>현위치 : 서울시 서초구 양재천로 131 4층</SearchInput.PlaceHolder>
          </SearchInput>
          {showScrolledListHeader && (
            <ScrolledListHeader>
              <ScrolledListHeader.Text>망원동에서 제일 가까운 곳</ScrolledListHeader.Text>
            </ScrolledListHeader>
          )}
        </View>

        <FlatList
          contentContainerStyle={css`
            margin: 0 16px;
          `}
          onScroll={handleScroll}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={cafeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CafeListItem data={item} onCardLinkClick={handleCardLinkClick} />}
          ListHeaderComponent={() => (
            <>
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
