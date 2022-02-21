import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddmode, setIsAddMode] = useState(false);
  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };
  const cancelHandler = () => {
    setIsAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currrentGoals) => {
      return currrentGoals.filter((goal) => goal.id !== goalId);
    });
  };
  return (
    <View style={styles.container}>
      <Button title='Add new goal' onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddmode}
        onAddGoal={addGoalHandler}
        onCancel={cancelHandler}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
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
});
