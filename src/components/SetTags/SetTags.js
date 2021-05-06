import React from 'react';
import { css } from '@emotion/native';
import { AllTags, EditTags } from './SetTags.styles';
import TagItem from '~/components/TagItem/TagItem';

const SetTags = ({ preferTags, onToggleTag, allTags }) => {
  return (
    <AllTags>
      {allTags.map((rowTags, i) => {
        return (
          <EditTags
            style={css`
              padding-bottom: ${i === allTags.length - 1 ? '0' : '32px'};
            `}
            key={i}>
            {rowTags.map((tag) => {
              return <TagItem key={tag.id} showCount={false} tag={tag} selected={preferTags.includes(tag.id)} onClick={onToggleTag} />;
            })}
          </EditTags>
        );
      })}
    </AllTags>
  );
};

SetTags.defaultProps = {
  allTags: [
    [
      { id: 'chair', count: 0, isSelected: false },
      { id: 'wifi', count: 0, isSelected: false },
      { id: 'seat', count: 0, isSelected: false },
      { id: 'timer', count: 0, isSelected: false },
    ],
    [
      { id: 'concent', count: 0, isSelected: false },
      { id: 'mute', count: 0, isSelected: false },
      { id: 'twentyFour', count: 0, isSelected: false },
      { id: 'parking', count: 0, isSelected: false },
    ],
    [
      { id: 'toilet', count: 0, isSelected: false },
      { id: 'study', count: 0, isSelected: false },
      { id: 'dessert', count: 0, isSelected: false },
      { id: 'smoking', count: 0, isSelected: false },
    ],
  ],
};

export default SetTags;
