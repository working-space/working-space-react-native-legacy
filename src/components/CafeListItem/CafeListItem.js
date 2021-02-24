import React, { useCallback } from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';
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

  const renderTagListItems = useCallback(() => {
    const CUT_LINE = 2;

    const displayTags = tags.slice(0, CUT_LINE);
    const hiddenTagCount = tags.slice(CUT_LINE).length;

    let result = displayTags.map((tag, index) => (
      <View
        key={`${tag}`}
        style={css`
          flex-direction: row;
          align-items: center;
        `}>
        {index !== 0 && <Item.TagBoundary />}
        <Item.Tag>
          <Item.TagIcon>{TAG[tag].icon}</Item.TagIcon>
          <Item.TagName>{TAG[tag].name}</Item.TagName>
        </Item.Tag>
      </View>
    ));

    if (hiddenTagCount > 0) {
      result = [
        ...result,
        <View
          key={`${hiddenTagCount}`}
          style={css`
            flex-direction: row;
            align-items: center;
          `}>
          <Item.TagBoundary />
          <Item.TagName>+{hiddenTagCount}</Item.TagName>
        </View>,
      ];
    }

    return result;
  }, [tags]);

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
      <Item.TagList>{renderTagListItems()}</Item.TagList>
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
