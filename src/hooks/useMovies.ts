import { useToast } from '@/context/toast';
import { APIConfiguration } from '@/lib/constants';
import { movieApi } from '@/services';
import { DiscoverMoviesParams, FavoriteBody, Movie } from '@/types';
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
  search: (query?: string, page?: number) =>
    ['movies', 'search', query, page] as const,
  credits: (movie_id: number) => ['movies', 'credits', movie_id] as const,
  addFavorite: () => ['favorites', 'add'] as const,
  allFavorites: (account_id?: number, movie_id?: number) =>
    ['favorites', 'all', account_id, movie_id] as const,

  getVideoTrailer: (movie_id: number) => ['videoTrailer', movie_id],
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

  const lastPage = query.data?.pages[query.data.pages.length - 1];

  const pagination = {
    page: lastPage?.page || 1,
    total_pages: lastPage?.total_pages || 1,
    total_results: lastPage?.total_results || allResults.length,
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

export const useInfiniteSearch = ({ query }: { query: string }) => {
  return useInfiniteQuery({
    queryKey: movieKeys.search(query),
    queryFn: ({ pageParam = 1 }) => movieApi.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.page || !lastPage.total_pages)
        return undefined;
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
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
    onMutate: async ({ account_id, body }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: movieKeys.allFavorites(account_id),
        }),
        queryClient.cancelQueries({
          queryKey: movieKeys.allFavorites(body.media_id),
        }),
      ]);

      const previousList = queryClient.getQueryData<Movie[]>(
        movieKeys.allFavorites(account_id)
      );

      if (previousList) {
        queryClient.setQueryData<Partial<Movie>[]>(
          movieKeys.allFavorites(account_id),
          (old) => {
            if (!old) return old;

            if (body.favorite) {
              const exists = old.some((m) => m.id === body.media_id);
              if (exists) return old;
              return [...old, { id: body.media_id, is_favorited: true }];
            } else {
              const newList = old.filter((m) => m.id !== body.media_id);
              return newList;
            }
          }
        );
      }
      return { previousList, account_id };
    },
    onSuccess: () => {
      showToast('Successfully updated favorite status!', 'success');
    },
    onError: (_, __, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(
          movieKeys.allFavorites(context.account_id),
          context.previousList
        );
      }
      showToast('Failed to update favorite status.', 'error');
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: movieKeys.allFavorites(variables.account_id),
      });
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
    queryFn: () => movieApi.getAllFavorites(movie_id, account_id),
    enabled: account_id > 0,
    staleTime: 60_000,
  });
};

export const usePrefetcVideo = () => {
  const queryClient = useQueryClient();

  const prefetch = (movie_id: number) => {
    queryClient.prefetchQuery({
      queryKey: movieKeys.getVideoTrailer(movie_id),
      queryFn: () => movieApi.getVideo(movie_id),
    });
  };

  return { prefetch };
};

export const useGetVideoTrailer = (movie_id: number) => {
  return useQuery({
    queryKey: movieKeys.getVideoTrailer(movie_id),
    queryFn: () => movieApi.getVideo(movie_id),
    staleTime: 60_000,
  });
};
