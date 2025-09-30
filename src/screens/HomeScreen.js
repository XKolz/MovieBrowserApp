// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useMovieContext } from '../context/MovieContext';
import { getPopularMovies, searchMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { loadFavorites } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
  const { state, dispatch } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
    loadSavedFavorites();
  }, []);

  const loadSavedFavorites = async () => {
    const favorites = await loadFavorites();
    dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
  };

  const fetchPopularMovies = async (pageNum = 1, append = false) => {
    if (!append) {
      dispatch({ type: 'SET_LOADING', payload: true });
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await getPopularMovies(pageNum);
      if (append) {
        dispatch({ type: 'APPEND_MOVIES', payload: data.results });
      } else {
        dispatch({ type: 'SET_MOVIES', payload: data.results });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && !isSearching) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPopularMovies(nextPage, true);
    }
  };

  const handleSearch = async query => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await searchMovies(query.trim());
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: data.results });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    } else {
      setIsSearching(false);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
  };

  const displayMovies = isSearching ? state.searchResults : state.movies;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />

      <Animated.View entering={FadeIn} style={styles.header}>
        <Text style={styles.headerTitle}>Movie Browser</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search movies..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* {state.loading ? ( */}
      {state.loading && !loadingMore ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#e74c3c" />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      ) : displayMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isSearching ? '🎭 No movies found' : '🎬 No movies available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayMovies}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color="#e74c3c"
                style={{ marginVertical: 20 }}
              />
            ) : null
          }
          renderItem={({ item, index }) => (
            <MovieCard
              movie={item}
              index={index}
              onPress={() =>
                navigation.navigate('Details', { movieId: item.id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
  },
});

export default HomeScreen;
