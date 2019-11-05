import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Smiley from "../../components/Smiley/Smiley";

//const query = "?name=kebab&orderby=NAME_AZ&cities=&smileys=&page=";
//const endpoint = "http://it2810-02.idi.ntnu.no:5000/companies/";
const HomeScreen = props => {
  ///  const [restaurants, setRestaurant] = useState(null);
  const handleOnPress = () => {
    props.navigation.navigate("Result");
    //fetchRestaurants();
  };
  /*
  const fetchRestaurants = () => {
    fetch(endpoint + query, {
      headers: {
        "Content-type": "text/html; charset=iso-8859-1"
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        setRestaurant(res);
        props.navigation.navigate("Result", restaurants);
        console.log(restaurants);
      });
  };*/
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
