import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    const listener = Dimensions.addEventListener('change', updateLayout);
    return () => {
      listener?.remove();
    };
  });
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, props.onGameOver, props.userChoice]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((curr) => curr + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth > 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            onPress={() => {
              nextGuessHandler('lower');
            }}
          >
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            onPress={() => {
              nextGuessHandler('greater');
            }}
          >
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>

        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler('lower');
          }}
        >
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler('greater');
          }}
        >
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  list: {
    alignItems: 'center',
  },
});

export default GameScreen;
