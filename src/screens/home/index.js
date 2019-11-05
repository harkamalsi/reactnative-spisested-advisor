import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Smiley from "../../components/Smiley/Smiley";

const HomeScreen = props => {
  const handleOnPress = () => {
    //On press of search button, build query and send it to result view
    let query = "?name=kebab&orderby=NAME_AZ&cities=&smileys=&page=";
    props.navigation.navigate("Result", { query: query });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search for a restaurant</Text>
      <Button title="Search!" onPress={handleOnPress.bind(this)} />
      <Smiley year={2010} value={2}>
        {" "}
      </Smiley>
    </View>
  );
};

export default HomeScreen;
