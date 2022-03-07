import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import { fetchPlaces, insertPlace } from '../helpers/db';
import KEYS from '../KEYS';

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${KEYS.MAPS_KEY}`
    );
    if (!response.ok) {
      throw new Error('Error');
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error('Error');
    }

    const address = resData.results[0].formatted_address;
    console.log(resData);
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({ from: image, to: newPath });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      ).catch((err) => console.log(err));
      console.log(dbResult);
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        coords: { lat: location.lat, lng: location.lng },
      },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
