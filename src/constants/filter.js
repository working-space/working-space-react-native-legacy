import React from 'react';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import NearestIllustURL from '~/assets/images/m_nearest_illust.jpg';
import CommentIllustURL from '~/assets/images/m_comment_illust.jpg';
import FavoriteIllustURL from '~/assets/images/m_favorite_illust.jpg';

const FILTER = {
  NEAREST: {
    id: 'NEAREST',
    name: '가까운',
    imageURL: <AutoFitImage source={NearestIllustURL} />,
  },
  MANY_COMMENTS: {
    id: 'MANY_COMMENTS',
    name: '댓글 많은',
    imageURL: <AutoFitImage source={CommentIllustURL} />,
  },
  MANY_FAVORITES: {
    id: 'MANY_FAVORITES',
    name: '좋아요 많은',
    imageURL: <AutoFitImage source={FavoriteIllustURL} />,
  },
};

export default FILTER;
