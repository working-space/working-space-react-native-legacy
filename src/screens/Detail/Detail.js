import React from 'react';
import { observer } from 'mobx-react-lite';
import { DetailWrapper, LinkIconWrapper } from './Detail.styles';
import Header from '~/components/Header/Header';
import DetailTitle from '~/components/DetailInfo/DetailTitle';
import DetailInfo from '~/components/DetailInfo/DetailInfo';
import DetailLocation from '~/components/DetailInfo/DetailLocation';
import TagList from '~/components/TagList/TagList';
import CommentList from '~/components/CommentList/CommentList';
import ImageGrid from '~/components/ImageGrid/ImageGrid';
import BackIcon from '~/assets/icons/icon_back.svg';
import ShareIcon from '~/assets/icons/icon_share.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';

const Detail = ({ route, navigation: { goBack } }) => {
  const { cardData } = route.params;
  const { title, distance, tags, address } = cardData;
  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => goBack()}>
            <BackIcon />
          </Header.Button>
        }
        right={
          <LinkIconWrapper>
            <LinkIconWrapper.Item>
              <FavoriteIcon width="24" height="24" />
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item>
              <BookmarkIcon width="24" height="24" />
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item>
              <ShareIcon width="24" height="24" />
            </LinkIconWrapper.Item>
          </LinkIconWrapper>
        }
      />
      <DetailWrapper>
        <DetailTitle title={title} distance={distance} tags={tags} />
        <ImageGrid />
        <DetailInfo address={address} />
        <DetailLocation />
        <TagList />
        <CommentList />
      </DetailWrapper>
    </>
  );
};

export default observer(Detail);
