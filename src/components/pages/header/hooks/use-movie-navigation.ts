import { useRouter } from 'next/navigation';
import { usePrefetchMovieDetail } from '@/hooks/useMovies';

export const useMovieNavigation = () => {
  const router = useRouter();
  const { prefetchMovieDetail } = usePrefetchMovieDetail();

  const navigateToDetail = async (movieId: number) => {
    await prefetchMovieDetail(movieId);
    router.push(`/movies/${movieId}`);
  };

  const navigateToTrailer = (movieId: number) => {
    router.push(`/movies/trailer/${movieId}`);
  };

  return {
    navigateToDetail,
    navigateToTrailer,
  };
};
