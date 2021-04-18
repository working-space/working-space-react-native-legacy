import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import { css } from '@emotion/native';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { requestPermissions } from '~/utils/permission';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import { Container, SearchInput, HeaderText, ScrolledListHeader, ListSeparator, FilterChangeButton, FilterSelect, Dimmed } from './Main.styles';
import FILTER from '~/constants/filter';
import dummyIllustURL from '~/assets/images/dummy_illust.jpg';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import MapIcon from '~/assets/icons/icon_map.svg';
import DropDownArrowIcon from '~/assets/icons/icon_dropdown_arrow.svg';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Main = ({ navigation }) => {
  const { AuthStore, CafeListStore, GeoLocationStore } = useStore();
  const { logout } = AuthStore;
  const { fetchCafeList, isFetching, fetchedCafeList } = CafeListStore;
  const { currentLocation, getCurrentLocation } = GeoLocationStore;

  const [nowFilter, setNowFilter] = useState(FILTER.NEAREST);
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);
  const [showScrolledListHeader, setShowScrolledListHeader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cafeList, setCafeList] = useState([]);

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
    (cafe) => {
      navigation.navigate('Detail', { cafeId: cafe.id });
    },
    [navigation],
  );

  const getCafeList = useCallback(
    async (page = 1) => {
      const { latitude, longitude } = currentLocation;
      if (latitude && longitude) {
        try {
          await fetchCafeList(latitude, longitude, page);
          setCurrentPage((prevState) => prevState + 1);
        } catch (error) {
          // TODO: 에러 핸들링 필요
          // TODO: fetchCafeList와 try catch 문이 불필요하게 두번 사용되는 상황 변경 필요
          console.warn(error);
        }
      }
    },
    [currentLocation, fetchCafeList],
  );

  useEffect(() => {
    requestPermissions();
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    getCafeList();
  }, [getCafeList]);

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
              <ScrolledListHeader.Text>현위치에서 제일 가까운 곳</ScrolledListHeader.Text>
            </ScrolledListHeader>
          )}
        </View>

        <FlatList
          contentContainerStyle={css`
            margin: 0 16px;
            padding-bottom: 24px;
          `}
          onScroll={handleScroll}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          data={toJS(fetchedCafeList)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ListSeparator />}
          renderItem={({ item }) => {
            const { id, name, dist, road_addr, tags } = item;
            const distance = `${Math.floor(dist.calculated)}m`;

            const cafe = {
              id: id,
              title: name,
              distance,
              address: road_addr,
              tags,
            };

            return <CafeListItem data={cafe} onCardLinkClick={handleCardLinkClick} />;
          }}
          ListHeaderComponent={() => (
            <>
              <HeaderText>
                현위치에서{'\n'}
                가장 {nowFilter} 곳
              </HeaderText>
              <AutoFitImage source={dummyIllustURL} />
            </>
          )}
          onEndReached={() => getCafeList(currentPage)}
          onEndReachedThreshold={0.9}
        />

        {/* TODO: 임시 메시지. 추후 별도의 spinner 필요 */}
        {isFetching && <Text>카페 리스트를 불러오고 있습니다.</Text>}
      </Container>
    </>
  );
};

export default observer(Main);
