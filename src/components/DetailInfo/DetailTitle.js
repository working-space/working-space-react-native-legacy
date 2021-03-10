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
          <SmallLocationIcon />
          <TitleInfo.Text>{distance}</TitleInfo.Text>
        </TitleInfo.Item>
        <TitleInfo.Item style={{ paddingRight: 8 }}>
          <SmallTagIcon />
          <TitleInfo.Text>태그 {tags.length}개</TitleInfo.Text>
        </TitleInfo.Item>
      </TitleInfo>
    </DetailTitleWrapper>
  );
};

DetailTitle.defaultProps = {
  title: 'Cafe',
};

export default DetailTitle;
