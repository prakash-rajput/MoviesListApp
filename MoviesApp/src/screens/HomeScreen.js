// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; 
// import TrendingMovies from '../components/TrendingMovies';
// import MoviesList from '../components/MoviesList';

// const TMDB_API_KEY = '5db1668a1fcb2d78a9196c7ccc537296';
// const BASE_URL = 'https://api.themoviedb.org/3';

// const HomeScreen = ({ navigation }) => {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false); // State for refreshing control

//   const fetchMovies = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const [trendingResponse, upcomingResponse, topRatedResponse] = await Promise.all([
//         fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
//         fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`),
//         fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
//       ]);

//       if (!trendingResponse.ok || !upcomingResponse.ok || !topRatedResponse.ok) {
//         throw new Error('Failed to fetch movies');
//       }

//       const trendingData = await trendingResponse.json();
//       const upcomingData = await upcomingResponse.json();
//       const topRatedData = await topRatedResponse.json();

//       setTrendingMovies(trendingData.results.slice(0, 10));
//       setUpcomingMovies(upcomingData.results);
//       setTopRatedMovies(topRatedData.results);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false); // Stop refreshing after the fetch is complete
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const handleRetry = () => {
//     fetchMovies();
//   };

//   const onRefresh = () => {
//     setRefreshing(true); // Start refreshing
//     fetchMovies();
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#ff9900" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorMessage}>{error}</Text>
//         <Button title="Retry" onPress={handleRetry} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView 
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContainer}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Movies</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
//           <Icon name="search" size={24} color="#ffffff" />
//         </TouchableOpacity>
//       </View>

//       {/* Trending Movies Section */}
//       <TrendingMovies trendingMovies={trendingMovies} navigation={navigation} />

//       {/* Upcoming Movies Section */}
//       <MoviesList title="Upcoming Movies" data={upcomingMovies} navigation={navigation} />

//       {/* Top Rated Movies Section */}
//       <MoviesList title="Top Rated Movies" data={topRatedMovies} navigation={navigation} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1A1A1A",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: "#1A1A1A",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1A1A1A',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1A1A1A',
//     padding: 20,
//   },
//   errorMessage: {
//     fontSize: 18,
//     color: 'red',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#1A1A1A',
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import TrendingMovies from '../components/TrendingMovies';
import MoviesList from '../components/MoviesList';

const TMDB_API_KEY = '5db1668a1fcb2d78a9196c7ccc537296';
const BASE_URL = 'https://api.themoviedb.org/3';

const HomeScreen = ({ navigation }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing control

  const dummyMovieData = {
    genres: [
      { id: 1, name: 'All', screen: 'SearchScreen' },
      { id: 2, name: 'Upcoming', screen: 'AllMovies',data:upcomingMovies , title:'Upcoming Movies'},
      { id: 3, name: 'Top Rated', screen: 'AllMovies',data: topRatedMovies, title:'Top Rated Movies'},
    ],
  };
  

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [trendingResponse, upcomingResponse, topRatedResponse] = await Promise.all([
        fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
      ]);

      if (!trendingResponse.ok || !upcomingResponse.ok || !topRatedResponse.ok) {
        throw new Error('Failed to fetch movies');
      }

      const trendingData = await trendingResponse.json();
      const upcomingData = await upcomingResponse.json();
      const topRatedData = await topRatedResponse.json();

      setTrendingMovies(trendingData.results.slice(0, 10));
      setUpcomingMovies(upcomingData.results);
      setTopRatedMovies(topRatedData.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after the fetch is complete
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRetry = () => {
    fetchMovies();
  };

  const onRefresh = () => {
    setRefreshing(true); // Start refreshing
    fetchMovies();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movies</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.genresContainer}>
      {dummyMovieData.genres.map((genre) => (
        <TouchableOpacity 
          key={genre.id} 
          style={styles.genreButton} 
          onPress={() => navigation.navigate(genre.screen,{movies:genre.data,title:genre.title})}

          // navigation.navigate('AllMovies', { movies: data,title:title })}>
        >
          <Text style={styles.genreText}>
            {genre.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>


      {/* Trending Movies Section */}

      <TrendingMovies trendingMovies={trendingMovies} navigation={navigation} />

      {/* Upcoming Movies Section */}
      <MoviesList title="Upcoming Movies" data={upcomingMovies} navigation={navigation} />

      {/* Top Rated Movies Section */}
      <MoviesList title="Top Rated Movies" data={topRatedMovies} navigation={navigation} />

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#1A1A1A",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  genresContainer: {
    flexDirection: 'row',
   //justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap:10,
    marginVertical: 10,
    marginHorizontal:5
  },
  genreText: {
    backgroundColor: '#3E3E3E',
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "500",
    margin: 3,
  //  width: '30%',
    borderRadius: 5,
    //maxWidth: '33%',
    textAlign: 'center',
  },

 
  genreButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 15,
   // padding: 10,
    margin: 5,
  },
  // genreText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },

});

export default HomeScreen;

