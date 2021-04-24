import React, { useCallback } from 'react';
import { isEmpty } from 'lodash';
import { TagListWrapper, TagListBox, NoneItem } from './TagList.styles';
import SmallPersonFillIcon from '~/assets/icons/icon_small_person_fill.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TagItem from '~/components/TagItem/TagItem';
import NoneImage from '~/assets/images/none-image.svg';

const TagList = (props) => {
  const { tags, preferTags, onSetTagsModal } = props;

  const handleSetTagsModal = useCallback(() => {
    onSetTagsModal?.();
  }, [onSetTagsModal]);

  return (
    <TagListWrapper>
      <TagListBox>
        <TagListBox.Header>
          <TagListBox.Left>
            <TagListBox.Title>태그</TagListBox.Title>
            <SmallPersonFillIcon />
            <TagListBox.Count>{isEmpty(tags) ? 0 : tags.length}</TagListBox.Count>
          </TagListBox.Left>
          <TouchableOpacity onPress={handleSetTagsModal}>
            <TagListBox.Button>평가하기</TagListBox.Button>
          </TouchableOpacity>
        </TagListBox.Header>
        {isEmpty(tags) ? (
          <NoneItem>
            <NoneImage />
            <NoneItem.Text>첫 태그를 남겨보세요!</NoneItem.Text>
          </NoneItem>
        ) : (
          <TagListBox.AllTags horizontal={true} showsHorizontalScrollIndicator={true}>
            {tags.map((tag, i) => {
              return <TagItem key={i} showCount={true} tag={tag} selected={isEmpty(preferTags) ? false : preferTags.includes(tag.id)} paddingValue={9} />;
            })}
          </TagListBox.AllTags>
        )}
      </TagListBox>
    </TagListWrapper>
  );
};

TagList.defaultProps = {
  tags: [
    { id: 'chair', count: 24, isSelected: false },
    { id: 'wifi', count: 13, isSelected: false },
    { id: 'seat', count: 11, isSelected: false },
    { id: 'timer', count: 19, isSelected: false },
    { id: 'concent', count: 8, isSelected: false },
    { id: 'mute', count: 21, isSelected: false },
    { id: 'twentyFour', count: 7, isSelected: false },
    { id: 'parking', count: 6, isSelected: false },
    { id: 'toilet', count: 16, isSelected: false },
    { id: 'study', count: 5, isSelected: false },
    { id: 'dessert', count: 13, isSelected: false },
    { id: 'smoking', count: 9, isSelected: false },
  ],
};

export default TagList;
