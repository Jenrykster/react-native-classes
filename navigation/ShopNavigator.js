import { Button, Platform, SafeAreaView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, {
  screenOptions,
} from '../screens/shop/ProductOverviewScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import { DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

/* const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name='cart' size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
); */

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={ordersScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen name='Orders' component={OrdersScreen} />
    </OrdersStackNavigator.Navigator>
  );
};
/* const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name='list' size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
); 
*/

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

/*
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name='create' size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
*/
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  //props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{ drawerActiveTintColor: Colors.primary }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => {
            return <Ionicons name='cart' size={23} color={props.color} />;
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => {
            return <Ionicons name='list' size={23} color={props.color} />;
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => {
            return <Ionicons name='create' size={23} color={props.color} />;
          },
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

/*
const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title='Logout'
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
*/

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

/*
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
 */
