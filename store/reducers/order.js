import Order from '../../models/order';
import { ADD_ORDER } from '../actions/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.totalAmount,
        new Date()
      );
      console.log(state, action);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};