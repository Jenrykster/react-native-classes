import React from 'react';
import { Text, View } from 'react-native';

const PlacesDetailScreen = (props) => {
  return (
    <View>
      <Text>Places Detail</Text>
    </View>
  );
};

PlacesDetailScreen.navigationOptions = (navData) => {
  return {
    title: navData.navigation.getParam('placeTitle'),
  };
};
export default PlacesDetailScreen;
