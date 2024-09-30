
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, StatusBar } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
 import splashBg from '../assets/splashBg.jpeg'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground style={styles.Container}  source={splashBg}  >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* <Text style={styles.text}>Welcome to Movie List App!</Text> */}
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:"cover",
    height:"100%"
    // backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default SplashScreen;
