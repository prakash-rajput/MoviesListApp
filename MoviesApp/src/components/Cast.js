import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const CastList = ({ cast }) => {
  // Log the cast data
  console.log("In cast", cast);

  // Use the actual cast data
  const dataToDisplay = cast && cast.length > 0 ? cast : []; 

  const renderCastItem = ({ item }) => (
    <View style={styles.castItem}>
      <Image
        source={{
          uri: item.profile_path
            ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
            : 'https://via.placeholder.com/90', 
        }}
        style={styles.castImage}
      />
       <Text style={styles.chaName}>
  {item?.character.length > 20 ? item?.character.substring(0, 20) + '...' : item?.character}
</Text>
      <Text style={styles.castName}>{item.original_name}</Text>
    </View>
  );

  return (
    <>{cast.length > 0  ? 
      <Text style={styles.castTitle}>Top Cast</Text>:null}
      <FlatList
        data={dataToDisplay}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCastItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.castList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  castList: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  castItem: {
    alignItems: 'center',
    marginRight: 10,
    width:120
  },
  castTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  castImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "gray",
    
  },
  chaName: {
    marginTop: 5,
    fontSize: 12,
    color: '#A9A9A9',
    textAlign: 'center',
  },
  castName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight:"400",
    color: '#A9A9A9',
    textAlign: 'center',
  },
});

export default CastList;
