import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import List from "../../components/List/List";

const FavouritesScreen = props => {
  const fetchFavouritesRestaurants = () => {
    //do something
    return [
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 1
      },
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 9
      },
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 10
      },
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 14
      },
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 15
      },
      {
        name: "Lang navn ok?",
        city: "Trondheim",
        sumStars: 122,
        numberOfRatings: 20,
        _id: 16
      }
    ];
  };
  const favourites = fetchFavouritesRestaurants();
  console.log(favourites);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>All your favourites restaurants</Text>
      <Button
        title="Restaurant"
        onPress={() => this.props.navigation.navigate("Detail")}
      />
      <List listRawData={favourites}> </List>
    </View>
  );
};

export default FavouritesScreen;
