import React, { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/native';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import {
  Container,
  SearchInput,
  ResultContainer,
  ResultList,
  SearchGuide,
  TabContainer,
  Tab,
} from './Search.styles';
import FILTER from '~/constants/filter';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import MapIcon from '~/assets/icons/icon_map.svg';

const Search = ({ navigation }) => {
  const { AuthStore } = useStore();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('location');

  const isTyping = useMemo(() => {
    return searchKeyword.trim() !== '';
  }, [searchKeyword]);

  return (
    <>
      <Header
        left={
          <Header.Button onPress={navigation.openDrawer}>
            <MenuIcon />
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
          placeholder="현위치 : 서울시 서초구 양재천로 131 4층"
          placeholderStyle={css`
            font-size: 12px;
            color: #a7a7a7;
          `}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
        />
        <TabContainer>
          <Tab onPress={() => setSearchType('location')}>
            <Tab.Text active={searchType === 'location'}>위치 검색</Tab.Text>
            {searchType === 'location' && <Tab.BottomLine />}
          </Tab>
          <Tab onPress={() => setSearchType('tag')}>
            <Tab.Text active={searchType === 'tag'}>태그 검색</Tab.Text>
            {searchType === 'tag' && <Tab.BottomLine />}
          </Tab>
        </TabContainer>
        <ResultList active={isTyping}>
          {isTyping ? (
            <>
              <ResultList.Item>
                <ResultList.Text>망원역 지하철 6호선</ResultList.Text>
              </ResultList.Item>
              <ResultList.Item>
                <ResultList.Text>서울시 마포구 망원동</ResultList.Text>
              </ResultList.Item>
            </>
          ) : (
            <SearchGuide>
              <SearchGuide.Text>
                검색하고 싶은 장소, 지하철 역 등 {'\n'}
                지역에 대한 정보를 입력해주세요.
              </SearchGuide.Text>
              <SearchGuide.Text small>
                예) 마포구 서교동, 합정역, 합정
              </SearchGuide.Text>
            </SearchGuide>
          )}
        </ResultList>
      </Container>
    </>
  );
};

export default observer(Search);
