import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  return (
    <Modal transparent={false} visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={goalInputHandler}
          placeholder='Course Goal'
          placeholderTextColor='white'
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <View style={{ width: '30%' }}>
            <Button title='Cancel' color='red' onPress={props.onCancel} />
          </View>
          <View style={{ width: '60%' }}>
            <Button
              onPress={() => {
                props.onAddGoal(enteredGoal);
                setEnteredGoal('');
              }}
              title='ADD'
              color='#9426d4'
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  inputContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    width: '80%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
export default GoalInput;
