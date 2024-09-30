import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 


const AllMoviesScreen = ({ route,navigation }) => {
  const movies= route.params?.movies;
  const title= route.params?.title;

  const renderMovieItem = ({ item }) => (
    <>
   
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id })}>

    <View style={styles.movieCard}>
    
      
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <View style={{width:"70%",paddingHorizontal:20,height:180}}>
      <Text style={styles.movieTitle}>
        {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
      </Text>
      <Text style={styles.releaseDate}>{item.release_date}</Text>
      <Text numberOfLines={4}
      style={styles.overview}>
       { item.overview}
      </Text>
      <Text style={styles.voteAverage}>Rating:{`${item.vote_average}`}</Text>

      </View>
    </View>
    </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:"center"}}>
        <TouchableOpacity
       onPress={() => navigation.goBack()}
        >
        <Icon  style={{paddingHorizontal:10}}
      name="left" size={24} color="#A9A9A9" />
        </TouchableOpacity>
     
      <Text style={styles.header}>{title}</Text>
      </View>
     
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
       // numColumns={2} // Adjust for grid layout
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:"#1A1A1A"
  },
  header:{
    color: '#A9A9A9',
    fontSize:18,
   // textAlign:"center",
    marginVertical:10
  },
  movieCard: {
    margin: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection:'row',
   
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 5,
    backgroundColor:'gray'
  },
  movieTitle: {
    fontSize: 20,
  //  marginTop: 5,
  //  textAlign: 'center',
    color: '#fff',
  },
  releaseDate: {
    fontSize: 12,
    color: '#777',
  },
  overview: {
    fontSize: 14,
    color: '#A9A9A9',
   // textAlign: 'center',
    marginTop: 15,
   // paddingHorizontal: 5,
  },
  voteAverage: {
    fontSize: 12,
    color: '#ff9900',
    position:"absolute",
    marginHorizontal:20,
    //marginTop: 5,
    bottom:5
  },
});

export default AllMoviesScreen;
