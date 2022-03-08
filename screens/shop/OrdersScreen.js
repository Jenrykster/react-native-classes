import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as ordersActions from '../../store/actions/order';

const OrdersScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <View>
        <Text>No orders found</Text>
      </View>
    );
  }

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

export const screenOptions = (navData) => {
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
