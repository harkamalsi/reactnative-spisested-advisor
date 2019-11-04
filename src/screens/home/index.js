import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Smiley from "../../components/Smiley/Smiley";

const HomeScreen = props => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search for a restaurant</Text>
      <Button
        title="Search!"
        onPress={() => props.navigation.navigate("Result")}
      />
      <Smiley year={2010} value={2}>
        {" "}
      </Smiley>
    </View>
  );
};

export default HomeScreen;
