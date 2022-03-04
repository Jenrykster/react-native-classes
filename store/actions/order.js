import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rnative-a0ca6-default-rtdb.firebaseio.com/orders/${userId}.json`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    const resData = await response.json();
    console.log(response);
    const loadedOrders = [];
    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          +resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  };
};
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const response = await fetch(
      `https://rnative-a0ca6-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      throw new Error('Error');
    }
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        totalAmount: totalAmount,
        date: date,
      },
    });
  };
};
