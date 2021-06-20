import { useCallback } from 'react';
import { useSWRInfinite } from 'swr';
import api from '../api';

const PAGE_SIZE = 20;

const fetcher = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useCafeList = ({ latitude, longitude }, { searchKeyword = null, searchType = 'location' } = {}) => {
  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.results) return null;

      if (!latitude || !longitude) return null;

      if (searchKeyword && searchType === 'location' && pageIndex === 0) return `/cafes/?search=${searchKeyword}&location=true&limit=${PAGE_SIZE}`;

      if (searchKeyword && searchType === 'cafe' && pageIndex === 0) return `/cafes/?search=${searchKeyword}&name=true&limit=${PAGE_SIZE}`;

      if (pageIndex === 0) return `/cafes/?lat=${latitude}&lon=${longitude}&limit=${PAGE_SIZE}`;

      return previousPageData.next;
    },
    [latitude, longitude, searchKeyword, searchType],
  );

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isEmpty = data?.[0]?.results?.length === 0;
  const isLoading = (!error && !data) || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results?.length < PAGE_SIZE);

  const fetchedData = data?.map?.(({ results }) => results);
  const cafeList = fetchedData ? [].concat(...fetchedData) : [];

  return { cafeList, isLoading, isReachingEnd, isError: error, size, setSize };
};

export default useCafeList;
