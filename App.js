import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./src/screens/home/index.js";
import ResultScreen from "./src/screens/result/index.js";
import FavouriteScreen from "./src/screens/favourite/index.js";
class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  switch (routeName) {
    case "Search":
      iconName = "ios-search";
      break;
    case "Favorites":
      iconName = "ios-star-outline";
      break;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};
const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Result: { screen: ResultScreen },
  Favourite: { screen: FavouriteScreen }
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Search: { screen: HomeScreen },
      Favorites: { screen: FavouriteScreen }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "gray"
      }
    }
  )
);
