import React, { useState, useCallback, useRef } from 'react';
import { FlatList, View, Animated, ActivityIndicator } from 'react-native';
import { css } from '@emotion/native';
import { observer } from 'mobx-react-lite';

import { Container, SearchInput, ScrolledListHeader, ListSeparator, FilterChangeButton, FilterSelect, Dimmed } from './Main.styles';
import Header from '~/components/Header/Header';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import FilterIllust from '~/components/FilterIllust/FilterIllust';
import FILTER from '~/constants/filter';
import MapIcon from '~/assets/icons/icon_map.svg';
import DropDownArrowIcon from '~/assets/icons/icon_dropdown_arrow.svg';
import useCafeList from '../../hooks/useCafeList';
import useGeolocation from '../../hooks/useGeoLocation';

const Main = ({ navigation }) => {
  const { geolocation, getGeolocation, geocode } = useGeolocation();

  const { cafeList, isLoading, size, setSize } = useCafeList(geolocation);

  const [nowFilter, setNowFilter] = useState(FILTER.NEAREST.id);
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleToggleSelectingFilter = () => {
    setIsSelectingFilter((prevState) => !prevState);
  };

  const handleSelectFilter = (filter) => {
    setNowFilter(filter);
    setIsSelectingFilter(false);
  };

  const handleRefresh = () => {
    getGeolocation();
    setSize(1);
  };

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

  const handleAdditionalLoad = () => {
    if (!isLoading) setSize(size + 1);
  };

  const handleCardLinkClick = useCallback(
    (cafe) => {
      navigation.navigate('Detail', { cafeId: cafe.id });
    },
    [navigation],
  );

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
            <SearchInput.PlaceHolder>현 위치 : {geocode}</SearchInput.PlaceHolder>
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
          refreshing={cafeList.length !== 0 && isLoading}
          data={cafeList}
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
          onEndReached={handleAdditionalLoad}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View
              style={css`
                margin-top: 20px;
              `}>
              <ActivityIndicator size="large" color="#e5e5e5" />
            </View>
          }
        />
      </Container>
    </>
  );
};

export default observer(Main);
