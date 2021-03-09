import React, { useCallback } from 'react';
import { TagListWrapper, TagListBox } from './TagList.styles';
import SmallPersonFillIcon from '~/assets/icons/icon_small_person_fill.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TagItem from '~/components/TagItem/TagItem';

const TagList = (props) => {
  const { tags, preferTags, onModalEvaluation } = props;

  const handleModalEvaluation = useCallback(() => {
    onModalEvaluation?.();
  }, [onModalEvaluation]);

  return (
    <TagListWrapper>
      <TagListBox>
        <TagListBox.Header>
          <TagListBox.Left>
            <TagListBox.Title>태그</TagListBox.Title>
            <SmallPersonFillIcon />
            <TagListBox.Count>{tags.length}</TagListBox.Count>
          </TagListBox.Left>
          <TouchableOpacity onPress={handleModalEvaluation}>
            <TagListBox.Button>평가하기</TagListBox.Button>
          </TouchableOpacity>
        </TagListBox.Header>
        <TagListBox.AllTags horizontal={true} showsHorizontalScrollIndicator={true}>
          {tags.map((tag, i) => {
            return <TagItem key={i} showCount={true} tag={tag} selected={preferTags.includes(tag.id)} style={{ padding: 0 }} paddingValue={12} />;
          })}
        </TagListBox.AllTags>
      </TagListBox>
    </TagListWrapper>
  );
};

TagList.defaultProps = {
  tags: [
    { id: 'FLUFFY_CHAIR', count: 24, isSelected: false },
    { id: 'FAST_WIFI', count: 13, isSelected: false },
    { id: 'MANY_SEATS', count: 11, isSelected: false },
    { id: 'TIME_LIMIT', count: 19, isSelected: false },
    { id: 'CONCENT', count: 8, isSelected: false },
    { id: 'QUIET', count: 21, isSelected: false },
    { id: 'TWENTY_FOUR', count: 7, isSelected: false },
    { id: 'PARKING_LOT', count: 6, isSelected: false },
    { id: 'CLEAN_TOILET', count: 16, isSelected: false },
    { id: 'STUDY_ROOM', count: 5, isSelected: false },
    { id: 'VARIOUS_DESSERTS', count: 13, isSelected: false },
    { id: 'SMOKING', count: 9, isSelected: false },
  ],
  preferTags: ['CLEAN_TOILET', 'STUDY_ROOM', 'VARIOUS_DESSERTS', 'SMOKING'],
};

export default TagList;
