// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { getMovieDetails } from '../services/tmdbApi';
// import { useMovieContext } from '../context/MovieContext';
// import { saveFavorites } from '../utils/storage';
// import { TMDB_IMAGE_BASE_URL } from '@env';

// const DetailsScreen = ({ route }) => {
//   const { movieId } = route.params;
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { state, dispatch } = useMovieContext();

//   useEffect(() => {
//     fetchDetails();
//   }, [movieId]);

//   const fetchDetails = async () => {
//     try {
//       const data = await getMovieDetails(movieId);
//       setMovie(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavorite = async () => {
//     dispatch({ type: 'TOGGLE_FAVORITE', payload: movie });
//     const updatedFavorites = state.favorites.find(m => m.id === movie.id)
//       ? state.favorites.filter(m => m.id !== movie.id)
//       : [...state.favorites, movie];
//     await saveFavorites(updatedFavorites);
//   };

//   const isFavorite = state.favorites.some(m => m.id === movieId);

//   if (loading) {
//     return <ActivityIndicator size="large" style={styles.loader} />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image
//         source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
//         style={styles.poster}
//       />
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}>{movie.title}</Text>
//           <TouchableOpacity onPress={toggleFavorite}>
//             <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.info}>
//           {movie.release_date} • {movie.runtime} min • ⭐{' '}
//           {movie.vote_average.toFixed(1)}
//         </Text>
//         <Text style={styles.genres}>
//           {movie.genres.map(g => g.name).join(', ')}
//         </Text>
//         <Text style={styles.overview}>{movie.overview}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   poster: {
//     width: '100%',
//     height: 500,
//   },
//   content: {
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   favoriteIcon: {
//     fontSize: 28,
//   },
//   info: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 8,
//   },
//   genres: {
//     fontSize: 14,
//     color: '#e74c3c',
//     marginTop: 8,
//     fontWeight: '600',
//   },
//   overview: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginTop: 16,
//     color: '#333',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });

// export default DetailsScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';
import { getMovieDetails } from '../services/tmdbApi';
import { useMovieContext } from '../context/MovieContext';
import { saveFavorites } from '../utils/storage';
import { TMDB_IMAGE_BASE_URL } from '@env';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useMovieContext();

  useEffect(() => {
    fetchDetails();
  }, [movieId]);

  const fetchDetails = async () => {
    try {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: movie });
    const updatedFavorites = state.favorites.find(m => m.id === movie.id)
      ? state.favorites.filter(m => m.id !== movie.id)
      : [...state.favorites, movie];
    await saveFavorites(updatedFavorites);
  };

  const isFavorite = state.favorites.some(m => m.id === movieId);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn}>
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.posterGradient} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{movie.title}</Text>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.favoriteButton}
              activeOpacity={0.7}
            >
              <Animated.Text
                entering={SlideInRight.springify()}
                style={styles.favoriteIcon}
              >
                {isFavorite ? '❤️' : '🤍'}
              </Animated.Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metadataRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ⭐ {movie.vote_average.toFixed(1)}
              </Text>
            </View>
            <Text style={styles.metadataText}>📅 {movie.release_date}</Text>
            <Text style={styles.metadataText}>⏱️ {movie.runtime} min</Text>
          </View>

          <View style={styles.genresContainer}>
            {movie.genres.map((genre, index) => (
              <Animated.View
                key={genre.id}
                entering={FadeIn.delay(300 + index * 100)}
                style={styles.genreChip}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
              </Animated.View>
            ))}
          </View>

          <Animated.View entering={FadeInDown.delay(400)}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  poster: {
    width: width,
    height: 550,
    backgroundColor: '#1a1a1a',
  },
  posterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(13,13,13,0.9)',
  },
  content: {
    padding: 20,
    marginTop: -30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    backgroundColor: '#1a1a1a',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255,193,7,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metadataText: {
    color: '#aaa',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  genreChip: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genreText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  overview: {
    fontSize: 14,
    lineHeight: 26,
    color: '#ccc',
  },
});

export default DetailsScreen;
