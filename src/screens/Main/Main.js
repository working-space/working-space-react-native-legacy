import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, View, Animated } from 'react-native';
import { css } from '@emotion/native';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { requestPermissions } from '~/utils/permission';
import useStore from '~/hooks/useStore';
import { Container, SearchInput, ScrolledListHeader, ListSeparator, FilterChangeButton, FilterSelect, Dimmed } from './Main.styles';
import Header from '~/components/Header/Header';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import LoadingBar from '~/components/LoadingBar/LoadingBar';
import FilterIllust from '~/components/FilterIllust/FilterIllust';
import FILTER from '~/constants/filter';
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

  const [nowFilter, setNowFilter] = useState(FILTER.NEAREST.id);
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const handleScroll = useCallback(
    (event) => {
      const THRESHOLD = 220;
      // TODO: 스크롤 될 때마다 event가 과도하게 발생하므로 최적화 필요
      if (event.nativeEvent.contentOffset.y >= THRESHOLD) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
    [fadeAnim],
  );

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
          <Header.Button onPress={() => navigation.navigate('ProfileMenu')}>
            <ProfileIcon />
          </Header.Button>
        }
        right={
          <>
            <FilterChangeButton onPress={handleToggleSelectingFilter}>
              <FilterChangeButton.Text active={isSelectingFilter}>{FILTER[nowFilter].name} 순</FilterChangeButton.Text>
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
              <FilterSelect.Item active={nowFilter === FILTER.NEAREST.id} onPress={() => handleSelectFilter(FILTER.NEAREST.id)}>
                <FilterSelect.Text active={nowFilter === FILTER.NEAREST.id}>{FILTER.NEAREST.name} 순</FilterSelect.Text>
              </FilterSelect.Item>
              <FilterSelect.Item active={nowFilter === FILTER.MANY_COMMENTS.id} onPress={() => handleSelectFilter(FILTER.MANY_COMMENTS.id)}>
                <FilterSelect.Text active={nowFilter === FILTER.MANY_COMMENTS.id}>{FILTER.MANY_COMMENTS.name} 순</FilterSelect.Text>
              </FilterSelect.Item>
              <FilterSelect.Item active={nowFilter === FILTER.MANY_FAVORITES.id} onPress={() => handleSelectFilter(FILTER.MANY_FAVORITES.id)}>
                <FilterSelect.Text active={nowFilter === FILTER.MANY_FAVORITES.id}>{FILTER.MANY_FAVORITES.name} 순</FilterSelect.Text>
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
            <SearchInput.PlaceHolder>현 위치 : 서울시 서초구 양재천로 131 4층</SearchInput.PlaceHolder>
          </SearchInput>
          <Animated.View style={{ opacity: fadeAnim, zIndex: 10 }}>
            <ScrolledListHeader>
              <ScrolledListHeader.Text>현 위치에서 가장 {FILTER[nowFilter].name} 곳</ScrolledListHeader.Text>
            </ScrolledListHeader>
          </Animated.View>
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
          ListHeaderComponent={<FilterIllust nowFilter={nowFilter} />}
          onEndReached={() => getCafeList(currentPage)}
          onEndReachedThreshold={0.9}
          ListFooterComponent={isFetching && <LoadingBar top={20} color={'#e5e5e5'} />}
        />
      </Container>
    </>
  );
};

export default observer(Main);
