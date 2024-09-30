
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MoviesList = ({ title, data, navigation }) => {
  console.log("Title",title)
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id})}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.movieImage}
        />
       <Text style={styles.movieTitle}>
  {item?.title?.length > 14 ? `${item?.title.substring(0, 14)}...` : item?.title}
</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <View style={styles.textView}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllMovies', { movies: data,title:title })}>
          <Text style={styles.sectionTitle2}>View All</Text>
        </TouchableOpacity>
        
      </View>
      
      <FlatList
        data={data.slice(0,10)}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
 fontWeight: '500',
    //marginBottom: 10,
    color: '#fff',
    marginHorizontal:10,
    marginBottom:10
   // textTransform: 'uppercase',
  },
  sectionTitle2: {
    fontSize: 16,

 fontWeight: '500',
    //marginBottom: 10,
       color: '#ff9900',

    marginHorizontal:10,
    marginBottom:10
   // textTransform: 'uppercase',
  },
  textView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  movieCard: {
    marginHorizontal: 5,
    width:120,
    alignItems: 'center',
   
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    backgroundColor:"gray"
  },
  movieTitle: {
    fontSize: 14,
   // padding: 10,
   fontWeight:'500',
    marginTop: 5,
    textAlign: 'center',
    color: '#A9A9A9',

  },
});

export default MoviesList;
