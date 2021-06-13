import React, { useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/native';
import Header from '~/components/Header/Header';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import { Container, SearchInput, ResultList, SearchGuide, TabContainer, Tab } from './Search.styles';
import MapIcon from '~/assets/icons/icon_map.svg';
import useGeolocation from '../../hooks/useGeolocation';

const Search = ({ navigation }) => {
  const { geocode } = useGeolocation();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('location');
  const [isFocusing, setFocusing] = useState(false);

  const isTyping = useMemo(() => {
    return searchKeyword.trim() !== '';
  }, [searchKeyword]);

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
        <TabContainer>
          <Tab onPress={() => setSearchType('location')} active={searchType === 'location'}>
            <Tab.Text active={searchType === 'location'}>지역 검색</Tab.Text>
            {/* {searchType === 'location' && <Tab.BottomLine />} */}
          </Tab>
          <Tab onPress={() => setSearchType('cafe')} active={searchType === 'cafe'}>
            <Tab.Text active={searchType === 'cafe'}>카페 검색</Tab.Text>
            {/* {searchType === 'cafe' && <Tab.BottomLine />} */}
          </Tab>
        </TabContainer>
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
      </Container>
    </>
  );
};

export default observer(Search);
