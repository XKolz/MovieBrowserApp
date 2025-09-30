import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@env';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get('/search/movie', { params: { query, page } });
  return response.data;
};

export const getMovieDetails = async movieId => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};
