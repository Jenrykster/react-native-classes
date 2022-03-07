import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ImgPicker from '../components/ImageSelector';
import Colors from '../constants/Colors';

import * as placesActions from '../store/places-actions';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
    props.navigation.goBack();
  };

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.label}>
        <Text>Title</Text>
        <TextInput
          value={titleValue}
          onChangeText={titleChangeHandler}
          style={styles.textInput}
        />
        <ImgPicker />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
NewPlaceScreen.navigationOptions = {
  title: 'Add Place',
};
export default NewPlaceScreen;
