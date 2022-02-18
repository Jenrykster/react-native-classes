import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals((currentGoals) => [...currentGoals, enteredGoal]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={goalInputHandler}
          placeholder='Course Goal'
          placeholderTextColor='white'
          style={styles.input}
        />
        <Button onPress={addGoalHandler} title='ADD' />
      </View>
      <View></View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    width: '80%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
