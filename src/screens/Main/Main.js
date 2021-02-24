import React, { useState } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
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
  CafeListContainer,
  Dimmed,
} from './Main.styles';
import FILTER from '~/constants/filter';
import dummyIllustURL from '~/assets/images/dummy_illust.jpg';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import MapIcon from '~/assets/icons/icon_map.svg';

const Main = ({ navigation }) => {
  const { AuthStore } = useStore();
  const { logout } = AuthStore;
  const [nowFilter, setNowFilter] = useState(FILTER.NEAREST);
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);

  const handleToggleSelectingFilter = () => {
    setIsSelectingFilter((prevState) => !prevState);
  };

  return (
    <>
      <Header
        nowFilter={nowFilter}
        setNowFilter={setNowFilter}
        isSelectingFilter={isSelectingFilter}
        setIsSelectingFilter={setIsSelectingFilter}
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
            </FilterChangeButton>
            <Header.Button onPress={() => navigation.navigate('Map')}>
              <MapIcon />
            </Header.Button>
          </>
        }
      />
      {isSelectingFilter && (
        <Dimmed activeOpacity={1} onPress={handleToggleSelectingFilter}>
          <Dimmed.Area />
        </Dimmed>
      )}
      <Container>
        <ScrollView>
          <SearchInput onPress={() => navigation.navigate('Search')}>
            <SearchInput.PlaceHolder>
              현위치 : 서울시 서초구 양재천로 131 4층
            </SearchInput.PlaceHolder>
          </SearchInput>
          <CafeListContainer>
            <HeaderText>
              망원동에서{'\n'}
              가장 {nowFilter} 곳
            </HeaderText>
            <AutoFitImage source={dummyIllustURL} />
            <View>
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: ['CONCENT', 'QUIET', 'PARKING_LOT'],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: [
                    'PARKING_LOT',
                    'CLEAN_TOILET',
                    'CONCENT',
                    'TWENTY_FOUR',
                  ],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: ['TWENTY_FOUR', 'STUDY_ROOM'],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: ['VARIOUS_DESSERTS', 'SMOKING'],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: ['TIME_LIMIT', 'MANY_SEATS'],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
              <CafeListItem
                data={{
                  title: '캐틀앤비',
                  distance: '3.5km',
                  address: '서울 서대문구 신촌동 190-21',
                  tags: ['FAST_WIFI', 'FLUFFY_CHAIR'],
                  favoriteCount: 10,
                  commentCount: 19,
                }}
              />
            </View>
          </CafeListContainer>
        </ScrollView>
        {/* <Button label="로그아웃" onPress={() => logout()} /> */}
      </Container>
    </>
  );
};

export default observer(Main);
