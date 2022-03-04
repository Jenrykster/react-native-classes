import React from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import Colors from '../constants/Colors';

const NewPlaceScreen = (props) => {
  return (
    <ScrollView>
      <View>
        <Text>Title</Text>
        <TextInput />
        <Button title='Save Place' color={Colors.primary} onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  title: 'Add Place',
};
export default NewPlaceScreen;
