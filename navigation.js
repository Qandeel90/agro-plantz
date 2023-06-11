import React, { useContext, useState } from "react";
import { Text, View, Button, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screen/Home";
import Product from "./screen/Product";
import Cart from "./screen/Cart";
import Checkout from "./screen/Checkout";
import Detection from "./screen/Detection";
import Login from "./screen/User/Login";
import Register from "./screen/User/Register";
import UserProfile from "./screen/User/UserProfile";
import { Provider } from "react-redux";
import store from "./Redux/store";
import adminCategories from "./screen/Admin/AdminCategories";
import adminProducts from "./screen/Admin/AdminProducts";
import ListItem from "./screen/Admin/ListItem";
import Order from "./screen/Admin/Order";
import ProductForm from "./screen/Admin/ProductForm";
import AuthGlobal from "././Context/store/AuthGlobal";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchPro from "./screen/SearchPro";
import Confirm from "./screen/Confirm";
import DrawerBar from "./screen/DrawerBar";

export default function RootNavigation() {
  return (
    <>
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </>
  );
}
function DrawerNav({ route }) {
  const Drawer = createDrawerNavigator();
  const context = useContext(AuthGlobal);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{ headerShown: false, drawerActiveTintColor: "#319f5e" }}
        drawerContent={(props) => <DrawerBar {...props} route={route} />}
      >
        <Drawer.Screen name="Home " component={TabNav} />
        {context.stateUser.user.isAdmin == true ? (
          <Drawer.Screen name="Admin" component={AdminNav} options={{}} />
        ) : null}
      </Drawer.Navigator>
    </>
  );
}
function TabNav() {
  const screenOptions = ({ route }) => ({
    headerShown: false,
    initialRouteName: "Home",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Product") {
        iconName = focused ? "grid" : "grid-outline";
      } else if (route.name === "Detection") {
        iconName = focused ? "leaf" : "leaf-outline";
      } else if (route.name === "Cart") {
        iconName = focused ? "cart" : "cart-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Admin") {
        iconName = focused ? "person-circle" : "person-circle-outline";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#3d3d3d",
    tabBarInactiveTintColor: "#319f5e",
    tabBarStyle: {
      height: 70,
      paddingBottom: 10,
      paddingTop: 10,
    },
  });
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HNav} />
        <Tab.Screen name="Product" component={ProductNav} />
        <Tab.Screen name="Detection" component={Detection} />
        <Tab.Screen name="Cart" component={CartNav} />
        <Tab.Screen name="Profile" component={UserNav} />
      </Tab.Navigator>
    </>
  );
}
function ProductNav() {
  const screenOptions = {
    headerShown: true,
  };
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Products" component={Product} />
        <Stack.Screen name="Search" component={SearchPro} />
      </Stack.Navigator>
    </>
  );
}
function HNav() {
  const screenOptions = {
    headerShown: false,
  };
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home " component={Home} />
      </Stack.Navigator>
    </>
  );
}
function CartNav() {
  const screenOptions = {
    headerShown: true,
  };
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Cart " component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />

        <Stack.Screen name="Confirm" component={Confirm} />
      </Stack.Navigator>
    </>
  );
}
function UserNav() {
  const screenOptions = {
    headerShown: false,
  };
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="User" component={UserProfile} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </>
  );
}
function AdminNav() {
  const screenOptions = ({ navigation, route }) => ({
    headerShown: true,
  });
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="AdminProducts" component={adminProducts} />
        <Stack.Screen name="ListItem" component={ListItem} />
        <Stack.Screen name="AdminCategories" component={adminCategories} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
      </Stack.Navigator>
    </>
  );
}
