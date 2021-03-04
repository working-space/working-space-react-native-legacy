import React, { useCallback } from 'react';
import { Item } from './TagItem.styles';
import TAG from '~/constants/tag';
import SmallCheckIcon from '~/assets/icons/icon_small_check.svg';

const TagItem = ({ tag, selected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.(tag);
  }, [tag, onClick]);

  return (
    <Item onPress={handleClick}>
      <Item.TagIcon style={{ borderColor: selected ? '#ffbb44' : '#cccccc' }}>
        {selected && (
          <Item.checkIcon>
            <SmallCheckIcon />
          </Item.checkIcon>
        )}
        {TAG[tag.id].icon}
      </Item.TagIcon>
      <Item.TagName style={{ fontWeight: selected ? 'bold' : '400', color: selected ? '#222222' : '#a7a7a7' }}>{TAG[tag.id].name}</Item.TagName>
    </Item>
  );
};

export default TagItem;
