import { MovieCardSkeleton } from '../skeleton';

const MappingMovieSkeleton = ({ limit = 20 }) =>
  Array.from({ length: limit }).map((_, i) => <MovieCardSkeleton key={i} />);

export default MappingMovieSkeleton;
