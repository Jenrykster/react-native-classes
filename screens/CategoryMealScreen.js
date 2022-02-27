import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';

const CategoryMealScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = (navData) => {
  const catId = navData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    title: selectedCategory.title,
  };
};

export default CategoryMealScreen;
