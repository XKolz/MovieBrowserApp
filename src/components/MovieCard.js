//src/components/MovieCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { TMDB_IMAGE_BASE_URL } from '@env';

const MovieCard = ({ movie, onPress }) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      style={styles.cardWrapper}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.gradient} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={styles.metadata}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.rating}>
                {movie.vote_average?.toFixed(1)}
              </Text>
            </View>
            <Text style={styles.year}>{movie.release_date?.split('-')[0]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  poster: {
    width: '100%',
    height: 260,
    backgroundColor: '#2a2a2a',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,193,7,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  star: {
    fontSize: 10,
    marginRight: 4,
  },
  rating: {
    fontSize: 10,
    color: '#ffc107',
    fontWeight: 'bold',
  },
  year: {
    fontSize: 10,
    color: '#aaa',
  },
});

export default MovieCard;
