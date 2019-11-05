import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Dimensions } from "react-native";
import Smiley from "../../components/Smiley/Smiley";
import StarRating from "react-native-star-rating";

const DetailScreen = promps => {
  const [restaurant, setRestaurantDetails] = useState(null);
  const [star, setStar] = useState(0);
  const [starGiven, setStarGiven] = useState(false);

  id = JSON.stringify(promps.navigation.getParam("id", "NO-ID"));

  const formatSmileys = smileys => {
    return smileys.map(smiley => (
      <Smiley
        key={smiley.date + "-" + smiley.grade}
        value={smiley.grade}
        year={smiley.date.substring(4)}
      ></Smiley>
    ));
  };
  const onStarRatingPress = rating => {
    setStar(rating);
    setStarGiven(true);
  };

  useEffect(() => {
    //Fetch details for a restaurant given an ID (props down from previous screen)
    let example = {
      name: "Mc donald",
      city: "Trondheim",
      address: "somethingveien 3",
      postcode: "7901",
      smileys: [
        { date: "01022019", grade: 2 },
        { date: "12122018", grade: 0 },
        { date: "01022019", grade: 3 },
        { date: "01022019", grade: 2 }
      ],
      sumStars: 122,
      numberOfRatings: 40
    };
    setRestaurantDetails(example);
    //Check if there is a saved rating in the local storage,
    //if it is, update now rating with setStar and update rating given with setStarGiven
  }, []);

  //Details screen is divided in 2 parts: Information and Map
  //The information part is divided in 6 rows
  if (restaurant !== null) {
    let textRating =
      restaurant.sumStars === 0
        ? "No Rating yet"
        : "Rating: " +
          (restaurant.sumStars / restaurant.numberOfRatings).toString();
    let textStar = !starGiven ? "Gi en vurdering :" : "Din vurdering:";
    //Get the height of the devices screen
    const screenHeight = Math.round(Dimensions.get("window").height);
    let smileys = formatSmileys(restaurant.smileys);
    let starPic = (
      <Image style={{ height: 30, width: 30 }} source={require("./star.png")} />
    );

    return (
      <View style={{ height: screenHeight }}>
        <View
          style={{
            backgroundColor: "#e2e2e249",
            flexDirection: "column",
            flex: 2
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 40, fontWeight: "600", alignSelf: "center" }}
            >
              {restaurant.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "200",
                alignSelf: "center",
                marginBottom: 40
              }}
            >
              {restaurant.address}, {restaurant.postcode}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {smileys}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                alignSelf: "center",
                marginRight: 5
              }}
            >
              {textRating}
            </Text>
            {starPic}
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "200",
              alignSelf: "center",
              marginBottom: 10
            }}
          >
            {textStar}
          </Text>

          <StarRating
            disabled={starGiven}
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            maxStars={5}
            rating={star}
            selectedStar={rating => onStarRatingPress(rating)}
            fullStarColor={"orange"}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text>Map</Text>
        </View>
      </View>
    );
  } else
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
};

export default DetailScreen;
