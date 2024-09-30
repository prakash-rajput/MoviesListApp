import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AllMoviesScreen from '../screens/AllMoviesScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';
// import MovieDetailScreen from '../screens/MovieDetailScreen';
// import CastScreen from '../screens/CastScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />

       <Stack.Screen 
        options={{ headerShown: false }}
        name="AllMovies" 
        component={AllMoviesScreen} />

       <Stack.Screen 
        options={{ headerShown: false }}
        name="MovieDetail" 
        component={MovieDetailScreen} />

        <Stack.Screen 
        options={{ headerShown: false }}
        name="SearchScreen" 
        component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
