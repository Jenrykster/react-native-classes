import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const GoalItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onDelete(props.id)}
    >
      <View style={styles.listItem}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  listItem: {
    borderColor: 'white',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#9426d4',
  },
});
export default GoalItem;
