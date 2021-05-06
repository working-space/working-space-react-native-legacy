import { useCallback } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import api from '../api';

export const useFetchDetailCafeData = (cafeId, userId, latitude, longitude) => {
  const detailCafeData = useSWR(['detailCafeData', cafeId, latitude, longitude], (_, cafeId, latitude, longitude) =>
    api
      .get(`/cafes/${cafeId}`, {
        params: {
          lat: latitude,
          lon: longitude,
        },
      })
      .then((res) => res.data),
  );
  const cafeLikeCount = useSWR(['cafeLikeCount', cafeId], (_, cafeId) =>
    api
      .get('/ratings/', {
        params: {
          cafe_id: cafeId,
        },
      })
      .then((res) => res.data.count),
  );

  const userPreferredTags = useSWR(['userPreferredTags', cafeId, userId], (_, cafeId, userId) =>
    api
      .get('/tags/', {
        params: {
          id: cafeId,
          name: userId,
        },
      })
      .then((res) => res.data.results),
  );
  const userToggleLikeCount = useSWR(['userToggleLikeCount', cafeId, userId], (_, cafeId, userId) =>
    api
      .get('/ratings/', {
        params: {
          cafe_id: cafeId,
          user_id: userId,
        },
      })
      .then((res) => res.data.count),
  );
  const userToggleBookmarkCount = useSWR(['userToggleBookmarkCount', userId], (_, userId) =>
    api
      .get('/bookmarks/', {
        params: {
          cafe_id: cafeId,
          user_id: userId,
        },
      })
      .then((res) => res.data.count),
  );
  const userCommentsData = useSWR(['userCommentsData', cafeId, userId], (_, cafeId, userId) =>
    api
      .get('/comments/', {
        params: {
          cafe_id: cafeId,
          user_id: userId,
        },
      })
      .then((res) => res.data.results),
  );

  const isDetailCafeDataLoading =
    detailCafeData.data == null ||
    cafeLikeCount.data == null ||
    userPreferredTags.data == null ||
    userToggleLikeCount.data == null ||
    userToggleBookmarkCount.data == null ||
    userCommentsData.data == null;

  const isDetailCafeDataError = detailCafeData.error || cafeLikeCount.error || userPreferredTags.error || userToggleLikeCount.error || userToggleBookmarkCount.error || userCommentsData.error;

  return { detailCafeData, cafeLikeCount, userPreferredTags, userToggleLikeCount, userToggleBookmarkCount, userCommentsData, isDetailCafeDataLoading, isDetailCafeDataError };
};

export const useFetchCommentsList = (cafeId) => {
  const newCommentsListDataGetKey = useCallback(
    (pageIndex, prevData) => {
      // 마지막 페이지
      if (prevData && prevData.next == null) {
        return null;
      }

      // 다음 페이지
      if (prevData && prevData.next != null) {
        return prevData.next;
      }

      return `/comments/?cafe_id=${cafeId}&offset=${pageIndex}&limit=3`;
    },
    [cafeId],
  );

  const commentsListData = useSWRInfinite(newCommentsListDataGetKey, async (url) => {
    const { data } = await api.get(url);
    return data;
  });

  const commentsData = commentsListData.data ?? [];
  const comments = [];

  for (const { results } of commentsData) {
    comments.push(...results);
  }

  const hasNextComments = commentsData[0]?.next;
  const isCommentsLoading = commentsListData.data == null;
  const isCommentsError = commentsListData.error;

  return { comments, hasNextComments, isCommentsLoading, isCommentsError };
};
