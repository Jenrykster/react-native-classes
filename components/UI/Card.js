import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});

export default Card;
