import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import {
  Container,
  SearchInput,
  HeaderText,
  CafeListContainer,
} from './Main.styles';
import dummyIllustURL from '~/assets/images/dummy_illust.jpg';

const Main = ({ navigation }) => {
  const { AuthStore } = useStore();
  const { logout } = AuthStore;

  return (
    <Container>
      <Header
        left={
          <Header.Button onPress={navigation.openDrawer}>
            <Text>메</Text>
          </Header.Button>
        }
        right={
          <>
            <Text>가까운 순</Text>
            <Header.Button onPress={() => navigation.navigate('Map')}>
              <Text>맵</Text>
            </Header.Button>
          </>
        }
      />
      <ScrollView>
        <SearchInput />
        <CafeListContainer>
          <HeaderText>망원동에서{'\n'}가장 가까운 곳</HeaderText>
          <AutoFitImage source={dummyIllustURL} />
          <View>
            <CafeListItem
              data={{
                title: '캐틀앤비',
                distance: '3.5km',
                address: '서울 서대문구 신촌동 190-21',
                tags: [],
                favoriteCount: 10,
                commentCount: 19,
              }}
            />
            <CafeListItem
            // data={{
            //   title: '캐틀앤비',
            //   distance: '3.5km',
            //   address: '서울 서대문구 신촌동 190-21',
            //   tags: [],
            //   favoriteCount: 10,
            //   commentCount: 19,
            // }}
            />
          </View>
        </CafeListContainer>
      </ScrollView>
      {/* <Button label="로그아웃" onPress={() => logout()} /> */}
    </Container>
  );
};

export default observer(Main);
