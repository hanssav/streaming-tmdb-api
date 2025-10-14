export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type DiscoverMoviesParams = {
  page?: number;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  'primary_release_date.lte'?: string | Date;
  limit?: number;
};
