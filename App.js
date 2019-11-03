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
        {/* {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: "absolute",
              right: -6,
              top: -3,
              backgroundColor: "red",
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {badgeCount}
            </Text>
          </View>
        )} */}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  switch (routeName) {
    case "Home":
      iconName = "ios-search";
      IconComponent = HomeIconWithBadge;
      break;
    /*  case "Result":
      iconName = `ios-list${focused ? "" : "-outline"}`;
      break; */
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
      Home: { screen: HomeScreen },
      //Result: { screen: ResultScreen },
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
