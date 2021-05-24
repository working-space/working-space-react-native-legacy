import { useCallback } from 'react';
import { useSWRInfinite } from 'swr';
import api from '../api';

const fetcher = (url) => api.get(url).then((res) => res.data);

const useCafeList = ({ latitude, longitude }) => {
  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.results) return null;

      if (pageIndex === 0) return `/cafes/?lat=${latitude}&lon=${longitude}&limit=20`;

      return previousPageData.next;
    },
    [latitude, longitude],
  );

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const fetchedData = data?.map(({ results }) => results);
  const cafeList = fetchedData ? [].concat(...fetchedData) : [];

  const isLoading = (!error && !data) || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return { cafeList, isLoading, isError: error, size, setSize };
};

export default useCafeList;
