import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    title: 'Your orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default OrdersScreen;
