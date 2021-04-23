import React, { Fragment } from 'react';
import Header from '~/components/Header/Header';
import { Container, Profile, FavoriteTags, Tag, Menu } from './ProfileMenu.styles';
import TAG from '~/constants/tag';
import CloseIcon from '~/assets/icons/icon_close.svg';
import SettingIcon from '~/assets/icons/icon_setting.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import CommentMenuIcon from '~/assets/icons/icon_comment_menu.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';

const favoriteTags = [TAG.concent, TAG.twentyFour, TAG.toilet, TAG.dessert];

const ProfileMenu = ({ navigation }) => {
  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.goBack()}>
            <CloseIcon style={{ fill: '#222' }} />
          </Header.Button>
        }
        right={
          <Header.Button>
            <SettingIcon />
          </Header.Button>
        }
      />
      <Container>
        <Profile>
          <Profile.Image />
          <Profile.Title>평범한 작업자</Profile.Title>
          <Profile.Name>김작업</Profile.Name>
        </Profile>
        <FavoriteTags>
          <FavoriteTags.Header>
            <FavoriteTags.Title>나의 선호 태그</FavoriteTags.Title>
            <FavoriteTags.Menu>수정하기</FavoriteTags.Menu>
          </FavoriteTags.Header>
          <FavoriteTags.List empty={favoriteTags.length <= 0}>
            {favoriteTags &&
              favoriteTags.map((tag, index) => (
                <Fragment key={tag.name}>
                  <Tag>
                    <Tag.Icon>{tag.icon}</Tag.Icon>
                    <Tag.Name>{tag.name}</Tag.Name>
                  </Tag>
                  {favoriteTags.length - 1 !== index && (
                    <Tag.SeparatorContainer>
                      <Tag.Separator />
                    </Tag.SeparatorContainer>
                  )}
                </Fragment>
              ))}
            {favoriteTags.length <= 0 && <FavoriteTags.EmptyText>등록된 태그가 없습니다.</FavoriteTags.EmptyText>}
          </FavoriteTags.List>
        </FavoriteTags>
        <Menu>
          <Menu.Item onPress={() => navigation.navigate('Favorites')}>
            <Menu.Icon>
              <FavoriteFillIcon />
            </Menu.Icon>
            <Menu.Text>좋아요 누른 작업공간</Menu.Text>
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('Comments')}>
            <Menu.Icon>
              <CommentMenuIcon />
            </Menu.Icon>
            <Menu.Text>작성한 리뷰</Menu.Text>
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('Bookmarks')}>
            <Menu.Icon>
              <BookmarkIcon />
            </Menu.Icon>
            <Menu.Text>즐겨찾기</Menu.Text>
          </Menu.Item>
        </Menu>
      </Container>
    </>
  );
};

export default ProfileMenu;