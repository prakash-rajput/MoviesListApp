import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const TrendingMovies = ({ trendingMovies, navigation }) => {
  if (!trendingMovies.length) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  const renderTrendingMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id })}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.movieImage}
        />
        {/* <Text style={styles.movieTitle}>{item.title}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending</Text>
      <Carousel
        loop
        width={width}
        height={width * 1.1}
        autoPlay={true}
        data={trendingMovies}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            {renderTrendingMovieItem({ item })}
          </View>
        )}
        scrollAnimationDuration={1500}
        style={styles.carousel}
        pagingEnabled={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.78,
          parallaxScrollingOffset: 190,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
   // backgroundColor:"red",
    height:width*1.02
  },
  sectionTitle: {
    fontSize: 16,
 fontWeight: '500',
    //marginBottom: 10,
    color: '#fff',
    marginHorizontal:10
   // textTransform: 'uppercase',
  },
  carouselItem: {
    width: width * 0.8, // Set width to 80% of the screen
    marginHorizontal: width * 0.1, // Margin to make adjacent items visible
  },
  movieCard: {
    alignItems: 'center',
  },
  movieImage: {
    width: '90%', 
    height:'110%', 
    borderRadius: 20,
    resizeMode: 'cover',
    marginTop:-50
  },
  movieTitle: {
    fontSize: 18,
    padding: 10,
    marginTop: 5,
    textAlign: 'center',
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  carousel: {
    // flex: 1,
   // backgroundColor:"red",
    height:450
  },
});

export default TrendingMovies;
