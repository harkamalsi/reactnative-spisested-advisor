import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./src/screens/home/index.js";
import ResultScreen from "./src/screens/result/index.js";
import RatingsScreen from "./src/screens/favourites/index.js";
import DetailScreen from "./src/screens/detail/index.js";

//Stacks for tab elements
const SearchStack = createStackNavigator(
  {
    Search: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Result: {
      screen: ResultScreen,
      navigationOptions: {
        title: "Search Results"
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: "Detailed View"
      }
    }
  },
  {
    initialRouteName: "Search",

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#16a45f",
        textAlign: "center"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const RatingsStack = createStackNavigator(
  {
    Ratings: {
      screen: RatingsScreen,
      navigationOptions: {
        title: "My Ratings"
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: "Detailed View"
      }
    }
  },
  {
    initialRouteName: "Ratings",

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#16a45f",
        textAlign: "center"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
//Return an Icon component specific for each tab
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  switch (routeName) {
    case "Search":
      iconName = "ios-search";
      break;
    case "Ratings":
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
      Ratings: {
        screen: RatingsStack,
        navigationOptions: {
          tabBarLabel: "My Ratings"
        }
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {
        activeTintColor: "#16a45f",
        inactiveTintColor: "gray"
      }
    }
  )
);
//This will suppress warnings in Expo
console.disableYellowBox = true;
