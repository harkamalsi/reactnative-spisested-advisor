import React from "react";
import { Text, View } from "react-native";
import List from "../../components/List/List";

const FavouritesScreen = props => {
  const handlePress = (id, e) => {
    props.navigation.navigate("Detail", {
      id: id
    });
  };
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
      <List listRawData={favourites} handlePress={handlePress.bind(this)}>
        {" "}
      </List>
    </View>
  );
};

export default FavouritesScreen;
