import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText styles={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
    fontSize: 18,
  },
});

export default Header;
