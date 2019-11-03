import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Search for a restaurant</Text>
        <Button
          title="Search!"
          onPress={() => this.props.navigation.navigate("Result")}
        />
      </View>
    );
  }
}

export default HomeScreen;
