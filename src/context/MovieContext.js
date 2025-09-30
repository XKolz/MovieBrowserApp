import React, { createContext, useReducer, useContext } from 'react';

const MovieContext = createContext();

const initialState = {
  movies: [],
  searchResults: [],
  favorites: [],
  loading: false,
  error: null,
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };
    case 'APPEND_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        loading: false,
      };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.find(m => m.id === action.payload.id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(m => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
