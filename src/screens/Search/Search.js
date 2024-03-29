import React, { useState, useMemo } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/native';
import Header from '~/components/Header/Header';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import { Container, SearchInput, ResultList, SearchGuide, TabContainer, Tab, ListSeparator } from './Search.styles';
import MapIcon from '~/assets/icons/icon_map.svg';
import useGeolocation from '~/hooks/useGeolocation';
import useCafeList from '~/hooks/useCafeList';
import useDebounce from '~/hooks/useDebounce';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import ErrorBox from '~/components/ErrorBox/ErrorBox';

const Search = ({ navigation }) => {
  const { geocode, geolocation } = useGeolocation();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('location');
  const [isFocusing, setFocusing] = useState(false);

  const debouncedSearchKeyword = useDebounce(searchKeyword, 100);

  const { cafeList, isLoading, isReachingEnd, isError, size, setSize } = useCafeList(geolocation, { searchKeyword: debouncedSearchKeyword, searchType });

  const isTyping = useMemo(() => {
    return debouncedSearchKeyword.trim() !== '';
  }, [debouncedSearchKeyword]);

  const handleNavigateCafeDetail = (cafe) => {
    navigation.navigate('Detail', { cafeId: cafe.id });
  };

  const handleAdditionalLoad = () => {
    if (!isLoading) setSize(size + 1);
  };

  const handleChangeSearchType = (type) => {
    setSearchType(type);
    setSearchKeyword('');
  };

  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.navigate('ProfileMenu')}>
            <ProfileIcon />
          </Header.Button>
        }
        right={
          <Header.Button onPress={() => navigation.navigate('Map')}>
            <MapIcon />
          </Header.Button>
        }
      />
      <Container>
        <SearchInput
          autoFocus
          value={searchKeyword}
          placeholder={`현위치 : ${geocode}`}
          placeholderStyle={css`
            font-size: 12px;
            color: #a7a7a7;
          `}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
          onFocus={() => setFocusing(true)}
          onBlur={() => setFocusing(false)}
          isFocusing={isFocusing}
        />
        <TabContainer>
          <Tab onPress={() => handleChangeSearchType('location')} active={searchType === 'location'}>
            <Tab.Text active={searchType === 'location'}>위치 검색</Tab.Text>
          </Tab>
          <Tab onPress={() => handleChangeSearchType('cafe')} active={searchType === 'cafe'}>
            <Tab.Text active={searchType === 'cafe'}>카페 검색</Tab.Text>
          </Tab>
        </TabContainer>
        {debouncedSearchKeyword ? (
          <FlatList
            contentContainerStyle={css`
              flex: 1;
              padding: 24px 16px;
              ${cafeList.length === 0 && 'background-color: #fafafa;'}
            `}
            data={cafeList}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <ListSeparator />}
            renderItem={({ item }) => {
              const { id, name, road_addr, tags } = item;

              const cafe = {
                id: id,
                title: name,
                address: road_addr,
                tags,
              };

              return <CafeListItem data={cafe} onCardLinkClick={() => handleNavigateCafeDetail(cafe)} />;
            }}
            onEndReached={handleAdditionalLoad}
            onEndReachedThreshold={0.2}
            ListEmptyComponent={
              <>
                {isError && (
                  <ErrorBox>
                    <ErrorBox.Heading>앗!</ErrorBox.Heading>
                    <ErrorBox.Message>검색 결과를 불러오지 못했어요!{'\n'}잠시 후에 다시 시도해주세요</ErrorBox.Message>
                  </ErrorBox>
                )}
                {!isLoading && !isError && (
                  <SearchGuide>
                    <SearchGuide.Text>검색 결과가 없습니다</SearchGuide.Text>
                  </SearchGuide>
                )}
              </>
            }
            ListFooterComponent={
              <View
                style={css`
                  margin-top: 20px;
                `}>
                {!isError && !isReachingEnd && <ActivityIndicator size="large" color="#e5e5e5" />}
              </View>
            }
          />
        ) : (
          <ResultList active={isTyping}>
            {!isTyping && searchType === 'location' && (
              <SearchGuide>
                <SearchGuide.Text>
                  검색하고 싶은 장소, 지하철 역 등 {'\n'}
                  지역에 대한 정보를 입력해주세요.
                </SearchGuide.Text>
                <SearchGuide.Text small>예) 마포구 서교동, 합정역, 합정</SearchGuide.Text>
              </SearchGuide>
            )}
            {!isTyping && searchType === 'cafe' && (
              <SearchGuide>
                <SearchGuide.Text>검색하고 싶은 카페의 상호명을 입력해주세요.</SearchGuide.Text>
                <SearchGuide.Text small>예) 테라로사 커피, 스타벅스 강남역점</SearchGuide.Text>
              </SearchGuide>
            )}
          </ResultList>
        )}
      </Container>
    </>
  );
};

export default observer(Search);
