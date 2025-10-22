import { usePrefetchMovieDetail } from "@/hooks/useMovies";
import { useRoutingWithNProgress } from "@/hooks/useRoutingWithNProgress";

export const useMovieNavigation = () => {
  const { push } = useRoutingWithNProgress();
  const { prefetchMovieDetail } = usePrefetchMovieDetail();

  const navigateToDetail = async (movieId: number) => {
    await prefetchMovieDetail(movieId);
    push(`/movies/${movieId}`);
  };

  const navigateToTrailer = (movieId: number) => {
    push(`/movies/trailer/${movieId}`);
  };

  return {
    navigateToDetail,
    navigateToTrailer,
  };
};
