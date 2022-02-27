import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector((state) => state.meals.meals);

  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}</DefaultText>
        <DefaultText>{selectedMeal.complexity}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam('mealTitle');
  const toggleFavorite = navData.navigation.getParam('toggleFav');
  const isFavorite = navData.navigation.getParam('isFav');

  return {
    title: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ? 'star' : 'star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
