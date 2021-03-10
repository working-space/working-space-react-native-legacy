import React, { useCallback } from 'react';
import { css } from '@emotion/native';
import { Item } from './TagItem.styles';
import TAG from '~/constants/tag';
import SmallCheckIcon from '~/assets/icons/icon_small_check.svg';

const TagItem = ({ tag, showCount, selected, onClick, paddingValue }) => {
  const handleClick = useCallback(() => {
    onClick?.(tag);
  }, [tag, onClick]);

  return (
    <Item onPress={handleClick} style={{ paddingLeft: paddingValue, paddingRight: paddingValue }}>
      <Item.TagIcon
        style={css`
          border-color: ${selected ? '#ffbb44' : '#cccccc'};
        `}>
        {showCount ? (
          <Item.checkIcon
            style={css`
              background-color: ${selected ? '#ffbb44' : '#cccccc'};
            `}>
            <Item.countText>{tag.count}</Item.countText>
          </Item.checkIcon>
        ) : (
          selected && (
            <Item.checkIcon
              style={css`
                border: 2px solid #fff;
                top: -2px;
                right: -2px;
                background-color: #ffbb44;
              `}>
              <SmallCheckIcon />
            </Item.checkIcon>
          )
        )}
        {TAG[tag.id].icon}
      </Item.TagIcon>
      <Item.TagName
        style={css`
          font-weight: ${selected ? 'bold' : '400'};
          color: ${selected ? '#222222' : showCount ? '#222222' : '#a7a7a7'};
        `}>
        {TAG[tag.id].name}
      </Item.TagName>
    </Item>
  );
};

TagItem.defaultProps = {
  paddingValue: 8,
};

export default TagItem;
