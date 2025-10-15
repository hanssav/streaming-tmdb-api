import { useToast } from '@/context/toast';
import { APIConfiguration } from '@/lib/constants';
import { movieApi } from '@/services';
import { DiscoverMoviesParams, FavoriteBody } from '@/types';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  keepPreviousData,
} from '@tanstack/react-query';

export const movieKeys = {
  all: ['movies'] as const,
  discover: (params?: DiscoverMoviesParams) =>
    ['movies', 'discover', params] as const,
  detail: (id: number) => ['movies', 'detail', id] as const,
  search: (query: string, page: number) =>
    ['movies', 'search', query, page] as const,
  credits: (movie_id: number) => ['movies', 'credits', movie_id] as const,

  addFavorite: () => ['favorites', 'add'] as const,
  allFavorites: (account_id?: number, movie_id?: number) =>
    ['favorites', 'all', account_id, movie_id] as const,
};

export const useDiscoverMovies = (params?: DiscoverMoviesParams) => {
  return useQuery({
    queryKey: movieKeys.discover(params),
    queryFn: () => movieApi.discoverMovies(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePrefetcDiscoverhMovie = (params?: DiscoverMoviesParams) => {
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: movieKeys.discover(params),
      queryFn: () => movieApi.discoverMovies(params),
    });
  };
  return { prefetch };
};

export const useInfiniteDiscoverMovies = (params?: DiscoverMoviesParams) => {
  const query = useInfiniteQuery({
    queryKey: movieKeys.discover(params),
    queryFn: async ({ pageParam = 1 }) => {
      const defaultParam = { page: pageParam, ...params };
      const res = await movieApi.discoverMovies(defaultParam);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: ({ page, total_pages }) => {
      return page < total_pages ? page + 1 : undefined;
    },
    getPreviousPageParam: ({ page }) => {
      return page > 1 ? page - 1 : undefined;
    },
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const movies = query.data?.pages.flatMap((res) => res.results);
  const allResults = query.data?.pages.flatMap((p) => p.results) || [];

  const pagination = {
    page: query.data?.pages[0]?.page || 1,
    total_pages: query.data?.pages[0]?.total_pages || 1,
    total_results: query.data?.pages[0]?.total_results || allResults.length,
    results: allResults,
  };

  return { ...query, movies, pagination };
};

export const useMovieDetail = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getMovieById(id),
    enabled: enabled && id > 0,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: movieKeys.search(query, page),
    queryFn: () => movieApi.searchMovies(query, page),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrefetchMovieDetail = () => {
  const queryClient = useQueryClient();

  const prefetchMovieDetail = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: movieKeys.detail(id),
      queryFn: () => movieApi.getMovieById(id),
    });
  };

  return { prefetchMovieDetail };
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({
      account_id,
      body,
    }: {
      account_id: number;
      body: FavoriteBody;
    }) => {
      return movieApi.addToFavorite(account_id, body);
    },
    onSuccess: () => {
      showToast('Successfully updated favorite status!', 'success');
      queryClient.invalidateQueries({ queryKey: movieKeys.allFavorites() });
    },
    onError: () => {
      showToast('Failed to update favorite status.', 'error');
    },
  });
};

export const useMovvieCreditDetail = (movie_id: number) => {
  return useQuery({
    queryKey: movieKeys.credits(movie_id),
    queryFn: () => movieApi.getMovieCreditId(movie_id),
    enabled: movie_id > 0,
    staleTime: 10 * 60 * 1000,
  });
};

export const useAllFavorites = (movie_id?: number, acc_id?: number) => {
  const account_id = acc_id ?? APIConfiguration.mock_account_id;
  return useQuery({
    queryKey: movieKeys.allFavorites(account_id, movie_id),
    queryFn: () => movieApi.getAllFavorites(account_id, movie_id),
    enabled: account_id > 0,
    staleTime: 60_000,
  });
};
