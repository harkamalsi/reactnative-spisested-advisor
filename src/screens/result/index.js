import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

class ResultScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Results</Text>
        <Button
          title="Restaurant"
          onPress={() => this.props.navigation.navigate("Detail")}
        />
      </View>
    );
  }
}

export default ResultScreen;
