import React from 'react';
import { AllTags, EditTags } from './SetTags.styles';
import TagItem from '~/components/TagItem/TagItem';

const SetTags = ({ preferTags, onToggleTag, allTags }) => {
  return (
    <AllTags>
      {allTags.map((rowTags, i) => {
        return (
          <EditTags style={{ paddingBottom: i === allTags.length - 1 ? 0 : 32 }} key={i}>
            {rowTags.map((tag) => {
              return <TagItem key={tag.id} tag={tag} selected={preferTags.includes(tag.id)} onClick={onToggleTag} />
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
      { id: 'FLUFFY_CHAIR', count: 0, isSelected: false },
      { id: 'FAST_WIFI', count: 0, isSelected: false },
      { id: 'MANY_SEATS', count: 0, isSelected: false },
      { id: 'TIME_LIMIT', count: 0, isSelected: false },
    ],
    [
      { id: 'CONCENT', count: 0, isSelected: false },
      { id: 'QUIET', count: 0, isSelected: false },
      { id: 'TWENTY_FOUR', count: 0, isSelected: false },
      { id: 'PARKING_LOT', count: 0, isSelected: false },
    ],
    [
      { id: 'CLEAN_TOILET', count: 0, isSelected: false },
      { id: 'STUDY_ROOM', count: 0, isSelected: false },
      { id: 'VARIOUS_DESSERTS', count: 0, isSelected: false },
      { id: 'SMOKING', count: 0, isSelected: false },
    ],
  ],
};

export default SetTags;
