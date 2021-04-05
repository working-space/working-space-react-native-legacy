import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { css } from '@emotion/native';
import { Item } from './CafeListItem.styles';
import TAG from '~/constants/tag';
import LocationIcon from '~/assets/icons/icon_small_location_fill.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import CommentIcon from '~/assets/icons/icon_comment.svg';
import EditIcon from '~/assets/icons/icon_edit.svg';

const CafeListItem = (props) => {
  const { noBorder, onCardLinkClick } = props;
  const { title, distance, address, tags, badges, favoriteCount, commentCount } = props.data;

  const [tagList, setTagList] = useState([]);

  const handleCardLinkClick = useCallback(() => {
    onCardLinkClick?.(props.data);
  }, [onCardLinkClick, props.data]);

  const getTagList = useCallback(() => {
    if (!tags || tags.length <= 0) return;

    const CUT_LINE = 2;

    const displayTags = tags.slice(0, CUT_LINE);
    const hiddenTagCount = tags.slice(CUT_LINE).length;
    let result = displayTags.map((tag) => TAG[tag.id]);

    if (hiddenTagCount > 0) {
      result = [...result, { name: `+${hiddenTagCount}` }];
    }

    setTagList(result);
  }, [tags]);

  useEffect(() => {
    getTagList();
  }, [getTagList]);

  return (
    <Item onPress={handleCardLinkClick} noBorder={noBorder}>
      <Item.BadgeList>
        {badges &&
          badges.length > 0 &&
          badges.map((badge) => (
            <Item.Badge key={badge}>
              <Item.BadgeText>{badge}</Item.BadgeText>
            </Item.Badge>
          ))}
      </Item.BadgeList>
      <Item.Header>
        <Item.Title>{title}</Item.Title>
        <Item.HeaderRight>
          {distance && (
            <>
              <LocationIcon style={{ fill: '#222' }} />
              <Item.Distance>{distance}</Item.Distance>
            </>
          )}
        </Item.HeaderRight>
      </Item.Header>
      <Item.Address>{address}</Item.Address>
      {tagList && tagList.length > 0 ? (
        <FlatList
          horizontal
          contentContainerStyle={css`
            justify-content: center;
            margin-left: -2px;
            margin-bottom: 24px;
          `}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <Item.TagSeparatorContainer>
              <Item.TagSeparator />
            </Item.TagSeparatorContainer>
          )}
          data={tagList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Item.Tag>
              {item.icon && <Item.TagIcon>{item.icon}</Item.TagIcon>}
              <Item.TagName>{item.name}</Item.TagName>
            </Item.Tag>
          )}
        />
      ) : (
        <Item.TagEmpty>
          <EditIcon />
          <Item.TagEmptyText>지금 첫번째 태그를 등록해보세요</Item.TagEmptyText>
        </Item.TagEmpty>
      )}
      <Item.InfoList>
        <Item.Info>
          <FavoriteIcon />
          <Item.InfoCount>{favoriteCount ? favoriteCount : 0}</Item.InfoCount>
        </Item.Info>
        <Item.Info>
          <CommentIcon />
          <Item.InfoCount>{commentCount ? commentCount : 0}</Item.InfoCount>
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
    badges: [],
    favoriteCount: 0,
    commentCount: 0,
  },
};

export default CafeListItem;
