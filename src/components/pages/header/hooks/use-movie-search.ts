import { useInfiniteSearch } from '@/hooks/useMovies';
import { useDebounce } from '@/hooks/useDebounce';
import React from 'react';

export const useMovieSearch = () => {
  const [filter, setFilter] = React.useState<{ query: string }>({
    query: '',
  });

  const debounceQuery = useDebounce(filter, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSearch({ query: debounceQuery.query });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      query: e.target.value,
    }));
  };

  return {
    movies,
    searchValue: filter,
    onSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
