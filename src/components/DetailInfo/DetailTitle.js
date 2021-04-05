import React from 'react';
import { DetailTitleWrapper, HeadTitle, TitleInfo } from './DetailTitle.styles';
import SmallLocationIcon from '~/assets/icons/icon_small_location_fill.svg';
import SmallTagIcon from '~/assets/icons/icon_small_tag_fill.svg';

const DetailTitle = (props) => {
  const { title, distance, tags } = props;
  return (
    <DetailTitleWrapper>
      <HeadTitle>{title}</HeadTitle>
      <TitleInfo>
        <TitleInfo.Item style={{ paddingRight: 8 }}>
          <SmallLocationIcon style={{ fill: '#222' }} />
          <TitleInfo.Text>{distance}</TitleInfo.Text>
        </TitleInfo.Item>
        <TitleInfo.Item style={{ paddingRight: 8 }}>
          <SmallTagIcon style={{ fill: '#222' }} />
          <TitleInfo.Text>태그 {tags?.length ? tags.length : '0'}개</TitleInfo.Text>
        </TitleInfo.Item>
      </TitleInfo>
    </DetailTitleWrapper>
  );
};

DetailTitle.defaultProps = {
  title: 'Cafe',
  distance: '',
  tags: [],
};

export default DetailTitle;
