import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

const PlacesListScreen = (props) => {
  return (
    <View>
      <Text>Places list</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    title: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Place'
          iconName='add'
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
