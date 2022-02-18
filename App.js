import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
export default function App() {
  const [outputText, setOutputText] = useState('Hello, World!');

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>{outputText}</Text>
      <Button
        title='Change text'
        color='transparent'
        onPress={() => {
          setOutputText(outputText === 'Ouch!' ? 'Hello World' : 'Ouch!');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#344',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
