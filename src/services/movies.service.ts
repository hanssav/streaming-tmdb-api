// client api service
import apiClient from '@/lib/client-axios';
import { DiscoverMoviesParams, MoviesResponse } from '@/types';

export const movieApi = {
  discoverMovies: async (
    params?: DiscoverMoviesParams
  ): Promise<MoviesResponse> => {
    const response = await apiClient.get<MoviesResponse>('/movies/discover', {
      params,
    });
    return response.data;
  },

  getMovieById: async (id: number) => {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1) => {
    const response = await apiClient.get('/movies/search', {
      params: { query, page },
    });
    return response.data;
  },
};

// Alternative: Direct TMDB API calls (if skip middleware)
export const movieApiDirect = {
  discoverMovies: async (
    params?: DiscoverMoviesParams
  ): Promise<MoviesResponse> => {
    const response = await fetch(
      'http://localhost:3000/api/movies/discover?' +
        new URLSearchParams(params ? (params as Record<string, string>) : {})
    );
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
};

// (Server-side service)
import apiServer from '@/lib/server-axios';

export const discoverMovies = async (
  params: DiscoverMoviesParams = {}
): Promise<MoviesResponse> => {
  const defaultParams: DiscoverMoviesParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
    ...params,
  };

  const response = await apiServer.get<MoviesResponse>('/discover/movie', {
    params: defaultParams,
  });

  return response.data;
};

export const getMovieById = async (id: number) => {
  const response = await apiServer.get(`/movie/${id}`);
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await apiServer.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const ServerService = { discoverMovies, getMovieById, searchMovies };
