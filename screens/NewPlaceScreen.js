import React, { useCallback, useState } from 'react';
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
import LocationPicker from '../components/LocationPicker';

import * as placesActions from '../store/places-actions';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const locationPickHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);
  return (
    <ScrollView style={styles.form}>
      <View style={styles.label}>
        <Text>Title</Text>
        <TextInput
          value={titleValue}
          onChangeText={titleChangeHandler}
          style={styles.textInput}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickHandler}
        />
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
