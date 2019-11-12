import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Dimensions } from "react-native";
import Smiley from "../../components/Smiley/Smiley";
import StarRating from "react-native-star-rating";
import { AsyncStorage } from "react-native";
const DetailScreen = props => {
  const [restaurant, setRestaurantDetails] = useState(null);
  const [star, setStar] = useState(0);
  const [starGiven, setStarGiven] = useState(false);
  const endpoint = "http://it2810-02.idi.ntnu.no:5050/companies/id=";
  const id = props.navigation.getParam("_id", "NO-ID");

  const getStorage = async () => {
    let storageValue;
    try {
      storageValue = await AsyncStorage.getItem("@favorites");

      if (storageValue) {
        return JSON.parse(storageValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setStorage = async favorite => {
    let storageFavorites = await getStorage();

    let storageNames = [];
    let setStorage = true;

    if (storageFavorites !== undefined) {
      storageFavorites.forEach(item => storageNames.push(item.name));

      storageNames.forEach(name => {
        if (name === favorite.name) {
          setStorage = false;
        }
      });
    }

    try {
      // if favorite is not already saved (means setStorage = true) in storage then save it
      if (setStorage) {
        let newStorage;

        if (storageFavorites === undefined) {
          newStorage = [favorite];
        } else {
          newStorage = [...storageFavorites, favorite];
        }

        await AsyncStorage.setItem("@favorites", JSON.stringify(newStorage));
      }
    } catch (err) {
      console.log("ERROR SETTING");
      console.log(err);
    }

    console.log(storageNames);
  };

  const fetchRestaurantDetails = () => {
    console.log(endpoint + id);
    fetch(endpoint + id, {
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
        console.log("res", res[0]);
        setRestaurantDetails(res[0]);
      });
  };
  const formatSmileys = smileys => {
    return smileys
      .slice(0, 5)
      .map(smiley => (
        <Smiley
          key={smiley.date + "-" + smiley.grade}
          value={smiley.grade}
          year={smiley.date.substring(4)}
        ></Smiley>
      ));
  };
  const onStarRatingPress = rating => {
    let favorite = {
      _id: restaurant._id,
      name: restaurant.name,
      city: restaurant.city,
      sumStars: rating,
      numberOfRatings: 1
    };
    setStorage(favorite);
    setStar(rating);
    setStarGiven(true);
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("@favorites");
    } catch (err) {
      alert("Cannot remove!");
    }
  };

  useEffect(() => {
    //remove();

    //Fetch details for a restaurant given an ID (props down from previous screen)
    //if there are not passed down as props( from result screen)
    const name = props.navigation.getParam("name", null);
    if (name !== null) setRestaurantDetails(props.navigation.state.params);
    else fetchRestaurantDetails();
    //TODO: implementer symbiosis med backend
    // setRestaurantDetails(example);
    //Check if there is a saved rating in the local storage
    getStorage().then(favouriteRestaurants =>
      favouriteRestaurants.forEach(favouriteRestaurant => {
        if (id == favouriteRestaurant._id) {
          setStarGiven(true);
          setStar(favouriteRestaurant.sumStars);
        }
      })
    );

    //if it is, update now rating with setStar and update rating given with setStarGiven
  }, []);

  //Details screen is divided in 2 parts: Information and Map
  //The information part is divided in 6 rows
  if (restaurant !== null) {
    let textRating =
      restaurant.sumStars === 0
        ? "No Rating yet"
        : "Rating: " +
          (restaurant.sumStars / restaurant.numberOfRatings)
            .toFixed(2)
            .toString();
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
            //justifyContent: "flex-start",
            flex: 1
          }}
        >
          <Text
            style={{
              flex: 1.7,
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
              textAlignVertical: "center"
            }}
          >
            {restaurant.name}
          </Text>
          <Text
            style={{
              flex: 0.6,
              fontSize: 17,
              fontWeight: "200",
              alignSelf: "center"
            }}
          >
            {restaurant.address}, {restaurant.zipcode}
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            {smileys}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
              flex: 0.6,
              fontSize: 20,
              fontWeight: "200",
              alignSelf: "center",
              textAlignVertical: "center",
              textAlign: "center"
            }}
          >
            {textStar}
          </Text>
          <StarRating
            containerStyle={{
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
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
        <View style={{ flex: 1 }}>
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
