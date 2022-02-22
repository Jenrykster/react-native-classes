import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>The Game is Over!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default GameOverScreen;
