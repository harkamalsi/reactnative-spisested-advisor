import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./src/screens/home/index.js";
import ResultScreen from "./src/screens/result/index.js";
import FavouritesScreen from "./src/screens/favourites/index.js";
import DetailScreen from "./src/screens/detail/index.js";

//Stacks for tab elements
const SearchStack = createStackNavigator({
  Search: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Result: { screen: ResultScreen },
  Detail: { screen: DetailScreen }
});
const FavouritesStack = createStackNavigator({
  Favourites: {
    screen: FavouritesScreen,
    navigationOptions: {
      header: null
    }
  },
  Detail: { screen: DetailScreen }
});
//Return an Icon component specific for each tab
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  switch (routeName) {
    case "Search":
      iconName = "ios-search";
      break;
    case "Favourites":
      iconName = "ios-star-outline";
      break;
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};
//It export an app containter with a bottom tab with Search and Favourites tabs and their relatives stacks
export default createAppContainer(
  createBottomTabNavigator(
    {
      Search: { screen: SearchStack },
      Favourites: { screen: FavouritesStack }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {
        activeTintColor: "#66bdff",
        inactiveTintColor: "gray"
      }
    }
  )
);
//This will suppress warnings in Expo
console.disableYellowBox = true;
