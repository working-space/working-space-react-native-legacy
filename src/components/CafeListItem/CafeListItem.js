import React from 'react';
import { Item } from './CafeListItem.styles';
import TAG from '~/constants/tag';
import LocationIcon from '~/assets/icons/icon_small_location_fill.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import CommentIcon from '~/assets/icons/icon_comment.svg';

const CafeListItem = (props) => {
  const {
    title,
    distance,
    address,
    tags,
    favoriteCount,
    commentCount,
  } = props.data;

  return (
    <Item>
      <Item.Header>
        <Item.Title>{title}</Item.Title>
        <Item.HeaderRight>
          <LocationIcon />
          <Item.Distance>{distance}</Item.Distance>
        </Item.HeaderRight>
      </Item.Header>
      <Item.Address>{address}</Item.Address>
      <Item.TagList>
        <Item.Tag>
          <Item.TagIcon>{TAG.CONCENT.icon}</Item.TagIcon>
          <Item.TagName>{TAG.CONCENT.name}</Item.TagName>
        </Item.Tag>
        <Item.TagBoundary />
        <Item.Tag>
          <Item.TagIcon>{TAG.TWENTY_FOUR.icon}</Item.TagIcon>
          <Item.TagName>{TAG.TWENTY_FOUR.name}</Item.TagName>
        </Item.Tag>
      </Item.TagList>
      <Item.InfoList>
        <Item.Info>
          <FavoriteIcon />
          <Item.InfoCount>{favoriteCount}</Item.InfoCount>
        </Item.Info>
        <Item.Info>
          <CommentIcon />
          <Item.InfoCount>{commentCount}</Item.InfoCount>
        </Item.Info>
      </Item.InfoList>
    </Item>
  );
};

CafeListItem.defaultProps = {
  data: {
    title: '',
    distance: '',
    address: '',
    tags: [],
    favoriteCount: 0,
    commentCount: 0,
  },
};

export default CafeListItem;
