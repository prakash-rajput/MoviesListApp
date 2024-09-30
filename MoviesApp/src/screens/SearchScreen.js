
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const TMDB_API_KEY = '5db1668a1fcb2d78a9196c7ccc537296';
// const BASE_URL = 'https://api.themoviedb.org/3';

// const SearchScreen = ({ navigation }) => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [noResults, setNoResults] = useState(false);
//   const [page, setPage] = useState(2); 
//   const [isFetching, setIsFetching] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchPopularMovies();
//   }, []);

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (query) {
//         searchMovies();
//       } else {
//         setResults([]);
//         setPage(2);
//         setNoResults(false);
//         fetchPopularMovies(); 
//       }
//     }, 1000);

//     return () => clearTimeout(debounceTimeout);
//   }, [query]);

//   const fetchPopularMovies = async () => {
//     setIsFetching(true);
//     setRefreshing(false);
//     try {
//       const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
//       if (!response.ok) throw new Error('Failed to fetch popular movies');
//       const data = await response.json();
      
//       // Update popularMovies while ensuring uniqueness
//       setPopularMovies((prev) => {
//         const existingIds = new Set(prev.map(movie => movie.id));
//         const newMovies = data.results.filter(movie => !existingIds.has(movie.id));
//         return [...prev, ...newMovies];
//       });

//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const searchMovies = async () => {
//     setLoading(true);
//     setError(null);
//     setNoResults(false);
    
//     try {
//       const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
//       if (!response.ok) throw new Error('Failed to fetch movies');
//       const data = await response.json();
      
//       // Set results while ensuring uniqueness
//       setResults((prevResults) => {
//         const existingIds = new Set(prevResults.map(movie => movie.id));
//         const newResults = data.results.filter(movie => !existingIds.has(movie.id));
//         return newResults;
//       });

//       setNoResults(data.results.length === 0);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setQuery('');
//     setResults([]);
//     setNoResults(false);
//   };

//   const handleLoadMore = () => {
//     if (!loading && !isFetching && query === '') {
//       fetchPopularMovies();
//     }
//   };

//   const onRefresh = () => {
//     setQuery('');
//     setResults([]);
//     setRefreshing(true);
//     setPage(2); // Reset to page 1 for refreshing
//     fetchPopularMovies();
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
//       <View style={styles.movieCard}>
//         <Image
//           source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/150' }}
//           style={styles.movieImage}
//         />
//         <View style={styles.movieDetails}>
//           <Text style={styles.movieTitle}>
//             {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
//           </Text>
//           <Text style={styles.releaseDate}>{item.release_date}</Text>
//           <Text numberOfLines={4} style={styles.overview}>
//             {item.overview}
//           </Text>
//           <Text style={styles.voteAverage}>Rating: {item.vote_average ? item.vote_average : 'NA'}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const uniqueData = query ? results : popularMovies;

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for movies..."
//           value={query}
//           onChangeText={setQuery}
//         />
//         {query.length > 0 && (
//           <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
//             <Icon name="clear" size={20} color="#A9A9A9" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {loading && <ActivityIndicator size="large" color="#ff9900" style={styles.loader} />}
      
//       {results.length > 0 && !loading && (
//         <Text style={styles.resultCountText}>
//           Results ({results.length})
//         </Text>
//       )}

//       {error && <Text style={styles.errorText}>{error}</Text>}

//       {noResults && !loading && (
//         <Text style={styles.noResultsText}>No results found.</Text>
//       )}

//       <FlatList
//         data={uniqueData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         onEndReached={query === '' ? handleLoadMore : null}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={isFetching ? <ActivityIndicator size="large" color="#ff9900" /> : null}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#ff9900"
//           />
//         }
//       />
//     </View>
//   );
// };

// export default SearchScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#1A1A1A",
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#A9A9A9',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     color: '#fff',
//     flex: 1,
//   },
//   clearButton: {
//     padding: 10,
//   },
//   loader: {
//     marginVertical: 20,
//   },
//   errorText: {
//     color: 'red',
//     marginVertical: 10,
//     textAlign: 'center',
//   },
//   noResultsText: {
//     color: '#fff',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   resultCountText: {
//     color: '#fff',
//     marginVertical: 10,
//   },
//   movieCard: {
//     margin: 5,
//     width: '100%',
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: 5,
//     padding: 10,
//   },
//   movieImage: {
//     width: 120,
//     height: 180,
//     borderRadius: 5,
//     backgroundColor: "gray",
//   },
//   movieDetails: {
//     width: "70%",
//     paddingHorizontal: 20,
//     height: 180,
//   },
//   movieTitle: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   releaseDate: {
//     fontSize: 12,
//     color: '#777',
//   },
//   overview: {
//     fontSize: 14,
//     color: '#A9A9A9',
//     marginTop: 15,
//   },
//   voteAverage: {
//     fontSize: 12,
//     color: '#ff9900',
//     position: "absolute",
//     marginHorizontal: 20,
//     bottom: 5,
//   },
// });



import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TMDB_API_KEY = '5db1668a1fcb2d78a9196c7ccc537296';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(2); 
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for button visibility

  const flatListRef = useRef(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        searchMovies();
      } else {
        setResults([]);
        setPage(2);
        setNoResults(false);
        fetchPopularMovies(); 
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const fetchPopularMovies = async () => {
    setIsFetching(true);
    setRefreshing(false);
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch popular movies');
      const data = await response.json();
      
      setPopularMovies((prev) => {
        const existingIds = new Set(prev.map(movie => movie.id));
        const newMovies = data.results.filter(movie => !existingIds.has(movie.id));
        return [...prev, ...newMovies];
      });

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const searchMovies = async () => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      
      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map(movie => movie.id));
        const newResults = data.results.filter(movie => !existingIds.has(movie.id));
        return newResults;
      });

      setNoResults(data.results.length === 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setNoResults(false);
  };

  const handleLoadMore = () => {
    if (!loading && !isFetching && query === '') {
      fetchPopularMovies();
    }
  };

  const onRefresh = () => {
    setQuery('');
    setResults([]);
    setRefreshing(true);
    setPage(2);
    fetchPopularMovies();
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(offsetY > 200); // Show button when scrolled down more than 200 pixels
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/150' }}
          style={styles.movieImage}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>
            {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
          </Text>
          <Text style={styles.releaseDate}>{item.release_date}</Text>
          <Text numberOfLines={4} style={styles.overview}>
            {item.overview}
          </Text>
          <Text style={styles.voteAverage}>Rating:{item.vote_average ? item.vote_average : 'NA'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const uniqueData = query ? results : popularMovies;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="clear" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        )}
      </View>

      {loading && <ActivityIndicator size="large" color="#ff9900" style={styles.loader} />}
      
      {results.length > 0 && !loading && (
        <Text style={styles.resultCountText}>
          Results ({results.length})
        </Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {noResults && !loading && (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}

      <FlatList
        ref={flatListRef}
        data={uniqueData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={query === '' ? handleLoadMore : null}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff9900"
          />
        }
        onScroll={handleScroll} // Detect scroll position
        ListFooterComponent={isFetching ? <ActivityIndicator size="large" color="#ff9900" /> : null}
      />

      {showScrollToTop && ( // Render icon button conditionally
        <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
          <Icon name="arrow-upward" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1A1A1A",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
    flex: 1,
  },
  clearButton: {
    padding: 10,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  resultCountText: {
    color: '#fff',
    marginVertical: 10,
  },
  movieCard: {
    margin: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  movieDetails: {
    width: "70%",
    paddingHorizontal: 20,
    height: 180,
  },
  movieTitle: {
    fontSize: 20,
    color: '#fff',
  },
  releaseDate: {
    fontSize: 12,
    color: '#777',
  },
  overview: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 15,
  },
  voteAverage: {
    fontSize: 12,
    color: '#ff9900',
    position: "absolute",
    marginHorizontal: 20,
    bottom: 5,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff9900',
    borderRadius: 30,
    padding: 10,
    elevation: 5, // Adds shadow on Android
  },
});



