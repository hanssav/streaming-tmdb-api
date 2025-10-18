'use client';
import { APIConfiguration, IMAGES, PATH } from '@/lib/constants';
import { getSafeImage, handleImageError } from '@/lib/utils';
import { LucidePlayCircle } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui/button';
import { SearchMotion } from './search-layout';
import SectionWrapper from '../../container/section-wrapper';
import {
  movieKeys,
  useAddToFavorites,
  useAllFavorites,
  useInfiniteSearch,
  usePrefetchMovieDetail,
} from '@/hooks/useMovies';
import { Card } from '../favorite/card';
import { TypographySub, TypographyTitle } from '../../ui/typography';
import { Movie } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import EmptyData from '../../container/empty-data';
import { NO_DATA_FOUND } from '@/lib/constants/empty-data';
import { HeaderLayout } from './header-layout';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const account_id = APIConfiguration.mock_account_id;
  const [filter, setFilter] = React.useState<{ query: string }>({
    query: '',
  });
  const debounceQuery = useDebounce(filter, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSearch({ query: debounceQuery.query });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  console.log(movies, 'data');

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      query: e.target.value,
      page: 1,
    }));
  };
  const addToFavorite = useAddToFavorites();
  const queryClient = useQueryClient();
  const { data: favoriteData } = useAllFavorites();

  const onChangeFavorite = (id: number, favorited: boolean) => {
    if (!id) return;
    return addToFavorite.mutate(
      {
        account_id,
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: favorited ? false : true,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: movieKeys.allFavorites(account_id),
            refetchType: 'all',
          });
        },
      }
    );
  };

  const favoriteIds = React.useMemo(() => {
    if (!Array.isArray(favoriteData)) return new Set<number>();
    return new Set(favoriteData.map((movie: Movie) => movie.id));
  }, [favoriteData]);

  const isFavorite = React.useCallback(
    (movieId: number): boolean => {
      return favoriteIds.has(movieId);
    },
    [favoriteIds]
  );

  const { prefetchMovieDetail } = usePrefetchMovieDetail();

  return (
    <HeaderLayout.Root>
      <HeaderLayout.Container>
        <HeaderLayout.Mobile />

        <HeaderLayout.Desktop>
          <HeaderLayout.Logo className='hidden lg:block' />
          <HeaderLayout.Nav className='hidden lg:flex' />
        </HeaderLayout.Desktop>

        <HeaderLayout.Search onSearch={onSearch} searchValue={filter.query}>
          <SearchMotion.Layout>
            <SectionWrapper>
              <div className='space-y-6'>
                {movies.length ? (
                  <>
                    {movies.map((movie: Movie, idx) => (
                      <Card.CardMovie
                        key={`${movie.id}-${idx}`}
                        onClick={async () => {
                          await prefetchMovieDetail(movie.id);
                          router.push(`/movies/${movie.id}`);
                        }}
                      >
                        <div className='flex gap-6'>
                          <Card.Image
                            src={getSafeImage(
                              movie.poster_path,
                              IMAGES.DEFAULT_PROFILE,
                              PATH.TMDB_IMAGES_URL
                            )}
                            onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                            alt={`poster-${movie.original_title}`}
                          />

                          <Card.Content className='space-y-2 lg:space-y-6'>
                            <TypographyTitle
                              label={movie.title}
                              size='md'
                              lgSize='display-xs'
                            />
                            <Card.RatingWithValue value={movie.vote_average} />
                            <TypographySub
                              label={movie.overview}
                              className='line-clamp-2'
                              size='sm'
                              lgSize='md'
                            />
                            <Button
                              className='hidden lg:flex p-2'
                              size='lg'
                              onClick={() =>
                                router.push(`/movies/trailer/${movie.id}`)
                              }
                            >
                              Watch Trailer
                              <LucidePlayCircle />
                            </Button>
                          </Card.Content>
                          <Card.HeartButton
                            isFavorited={isFavorite(movie.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              onChangeFavorite(movie.id, isFavorite(movie.id));
                            }}
                            isLoading={
                              addToFavorite.isPending &&
                              addToFavorite.variables?.body.media_id ===
                                movie.id
                            }
                            className='hidden lg:flex size-16 aspect-square self-center lg:ml-auto'
                          />
                        </div>

                        <Card.Actions className='lg:hidden'>
                          <Button
                            className='flex-1 p-2'
                            size='lg'
                            onClick={() =>
                              router.push(`/movies/trailer/${movie.id}`)
                            }
                          >
                            Watch Trailer
                            <LucidePlayCircle />
                          </Button>
                          <Card.HeartButton
                            isFavorited={isFavorite(movie.id)}
                            isLoading={
                              addToFavorite.isPending &&
                              addToFavorite.variables?.body.media_id ===
                                movie.id
                            }
                            onChange={(e) => {
                              e.stopPropagation();
                              onChangeFavorite(movie.id, isFavorite(movie.id));
                            }}
                          />
                        </Card.Actions>
                      </Card.CardMovie>
                    ))}
                    {hasNextPage && (
                      <div
                        ref={loadMoreRef}
                        className='h-20 flex items-center justify-center'
                      >
                        {isFetchingNextPage && (
                          <p className='text-center text-sm text-gray-400'>
                            Loading more...
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyData
                    {...NO_DATA_FOUND}
                    className='min-h-[calc(100vh-8rem-5rem)]'
                  />
                )}
              </div>
            </SectionWrapper>
          </SearchMotion.Layout>
          <HeaderLayout.MobileActions
            onSearch={onSearch}
            searchValue={filter.query}
          />
        </HeaderLayout.Search>
      </HeaderLayout.Container>

      <HeaderLayout.MobileDrawer />
    </HeaderLayout.Root>
  );
};

export default Header;
