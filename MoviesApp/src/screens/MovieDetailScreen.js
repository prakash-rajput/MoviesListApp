

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign'; 
import Cast from '../components/Cast';

const TMDB_API_KEY = '5db1668a1fcb2d78a9196c7ccc537296';
const BASE_URL = 'https://api.themoviedb.org/3';

const { height } = Dimensions.get('window');

const MovieDetailScreen = ({ route, navigation }) => {
  const movieId = route.params?.movieId;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = 'https://via.placeholder.com/150';

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
      }
      const data = await response.json();
      setCredits(data.cast);
    } catch (error) {
      console.error("Error fetching movie credits: ", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  if (!movie) {
    return <Text style={styles.errorText}>Movie not found.</Text>;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
      <View style={styles.container}>
        {/* Image section with gradient */}
        <View style={styles.imageContainer}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="left" size={24} color="#fff"  />
          </TouchableOpacity>
          <Image
          resizeMode='cover'
            source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage }}
            style={styles.movieImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(23, 23, 23, 0.7)', 'rgba(23, 23, 23, 1)']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text style={styles.title}>{movie.title}</Text>
          </LinearGradient>
        </View>
        {/* Details section */}
        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Text style={styles.releaseDate}>{movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min</Text>
            <Text style={styles.voteAverage}>Rating: {movie?.vote_average}</Text>
          </View>
          {/* Genres section */}
          <View style={styles.genresContainer}>
            {movie.genres.map((genre) => (
              <Text key={genre.id} style={styles.genreText}>
                {genre?.name}
              </Text>
            ))}
          </View>
          <Text style={styles.overview}>{movie?.overview}</Text>
        </View>
        <Cast cast={credits} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  LoadingContainer: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    justifyContent:"center",
    alignItems:"center"
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    height: height * 0.65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    top: -10,
  },
  backButton: {
    position: 'absolute',
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    top: 50,
    left: 15,
    zIndex: 1,
    padding: 10,
    padding:10,
   backgroundColor: '#ff9900', 
    borderRadius: 30, 
   
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center",
  },
  detailsContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  releaseDate: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: 'center',
    color: '#A9A9A9',
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "400",
    color: '#A9A9A9',
  },
  voteAverage: {
    fontSize: 14,
    color: '#ff9900',
    width: 110,
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  genreText: {
    backgroundColor: '#3E3E3E',
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "400",
    margin: 3,
    width: '30%',
    borderRadius: 5,
    maxWidth: '33%',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MovieDetailScreen;
