import React from "react";
import { Text, View } from "react-native";
import Map from './map'

const DetailScreen = promps => {
  id = JSON.stringify(promps.navigation.getParam("id", "NO-ID"));

  return (
     <View style={{ flex: 1}} >
       <View >
        <Text>Restaurant details with id {id}</Text>
       </View>
      <View >
      <Map coordinates={[63.404536, 10.418654]}></Map>
      </View>
    </View> 
  );
};

export default DetailScreen;
