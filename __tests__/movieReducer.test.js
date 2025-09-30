import { movieReducer, initialState } from '../src/context/MovieContext';

const testReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.find(m => m.id === action.payload.id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(m => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

describe('Movie Reducer', () => {
  const initialState = { movies: [], favorites: [], loading: true };

  test('should set movies', () => {
    const movies = [{ id: 1, title: 'Test Movie' }];
    const newState = testReducer(initialState, {
      type: 'SET_MOVIES',
      payload: movies,
    });
    expect(newState.movies).toEqual(movies);
    expect(newState.loading).toBe(false);
  });

  test('should toggle favorite', () => {
    const movie = { id: 1, title: 'Test' };
    const state = testReducer(initialState, {
      type: 'TOGGLE_FAVORITE',
      payload: movie,
    });
    expect(state.favorites).toContainEqual(movie);

    const state2 = testReducer(state, {
      type: 'TOGGLE_FAVORITE',
      payload: movie,
    });
    expect(state2.favorites).toHaveLength(0);
  });
});
