import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./src/screens/home/index.js";
import ResultScreen from "./src/screens/result/index.js";
import FavouriteScreen from "./src/screens/favourite/index.js";

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Result: { screen: ResultScreen },
  Favourite: { screen: FavouriteScreen }
});

export default createAppContainer(TabNavigator);
