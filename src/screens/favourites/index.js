import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

class FavouritesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>All your favourites restaurants</Text>
        <Button
          title="Restaurant"
          onPress={() => this.props.navigation.navigate("Detail")}
        />
      </View>
    );
  }
}

export default FavouritesScreen;
