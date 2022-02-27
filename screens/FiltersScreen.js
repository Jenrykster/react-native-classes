import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        trackColor={{ true: Colors.primaryColor, false: '#ccc' }}
        thumbColor={Colors.primaryColor}
        onValueChange={props.onChange}
      />
    </View>
  );
};
const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      vegan: isVegan,
    };
    console.log(appliedFilters);
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isVegan, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label='Gluten-free'
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label='Vegan'
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (screenProps) => ({
  title: 'Filter Meals',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Menu'
        iconName='ios-menu'
        onPress={() => {
          screenProps.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Save'
        iconName='ios-save'
        onPress={() => {
          screenProps.navigation.getParam('save')();
        }}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});

export default FiltersScreen;
