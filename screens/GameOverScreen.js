import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText style={styles.text}>The Game is Over!</TitleText>
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/success.png')}
            /* source={{
            uri: 'https://images.unsplash.com/photo-1517074962970-9385efda78fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
          }} */
            style={styles.image}
            resizeMode='cover'
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'yellow',
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 40,
  },
  highlight: {
    color: colors.primary,
  },
  resultContainer: {
    marginHorizontal: 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 18,
    marginBottom: 10,
  },
});

export default GameOverScreen;
