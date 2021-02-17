import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { css } from '@emotion/native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Header from '~/components/Header/Header';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import {
  Container,
  SearchInput,
  HeaderText,
  CafeListContainer,
  CafeListItem,
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
            <CafeListItem>
              <View
                style={css`
                  flex-direction: row;
                  justify-content: space-between;
                `}>
                <Text
                  style={css`
                    font-size: 18px;
                    font-weight: 700;
                    position: relative;
                  `}>
                  캐틀앤비
                </Text>
                <Text
                  style={css`
                    font-size: 12px;
                  `}>
                  3.5km
                </Text>
              </View>

              <Text
                style={css`
                  font-size: 11px;
                  color: #a7a7a7;
                `}>
                서울시 서초구 양재천로 131 4층
              </Text>
              <View>
                <Text>콘센트가 많아요</Text>
                <Text>콘센트가 많아요</Text>
              </View>
              <Text></Text>
              <Text></Text>
            </CafeListItem>
          </View>
        </CafeListContainer>
      </ScrollView>
      {/* <Button label="로그아웃" onPress={() => logout()} /> */}
    </Container>
  );
};

export default observer(Main);
