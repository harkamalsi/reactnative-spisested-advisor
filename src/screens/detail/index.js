import React from "react";
import { Text, View } from "react-native";

const DetailScreen = promps => {
  id = JSON.stringify(promps.navigation.getParam("id", "NO-ID"));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Restaurant details with id {id}</Text>
    </View>
  );
};

export default DetailScreen;
