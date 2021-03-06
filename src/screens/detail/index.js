import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Dimensions } from "react-native";
import Smiley from "../../components/Smiley/Smiley";
import StarRating from "react-native-star-rating";
import Map from "../../components/Map/map-native-maps";
import styles from "./styles.js";

import { AsyncStorage } from "react-native";
const DetailScreen = props => {
  const [restaurant, setRestaurantDetails] = useState(null);
  const [star, setStar] = useState(0);
  const [starGiven, setStarGiven] = useState(false);
  const endpoint = "http://it2810-02.idi.ntnu.no:5050/companies/id=";
  const id = props.navigation.getParam("id", "NO-ID");

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

    let storageIds = [];
    let setStorage = true;

    if (storageFavorites !== undefined) {
      storageFavorites.forEach(item => storageIds.push(item._id));

      // Check to avoid duplicate ratings
      storageIds.forEach(_id => {
        if (_id === favorite._id) {
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
  };

  const fetchRestaurantDetails = () => {
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
    //logic for comunicating with API
    let body = { id, stars: rating };
    fetch("http://it2810-02.idi.ntnu.no:5050/companies/giverating", {
      method: "PUT",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        } else {
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
          fetchRestaurantDetails();

          props.navigation.state.params.onNewRating(
            id,
            restaurant.sumStars + rating,
            restaurant.numberOfRatings + 1
          );
        }
      });
  };

  useEffect(() => {
    //Fetch details for a restaurant given an ID (props down from previous screen)
    //if there are not passed down as props( from result screen)
    if (props.navigation.getParam("restaurant", null) !== null)
      setRestaurantDetails(props.navigation.state.params.restaurant);
    else fetchRestaurantDetails();
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
        ? "No ratings"
        : "Rating: " +
          (restaurant.sumStars / restaurant.numberOfRatings)
            .toFixed(2)
            .toString();
    let textStar = !starGiven ? "Leave a rating:" : "Your rating:";
    //Get the height of the devices screen
    const screenHeight = Math.round(Dimensions.get("window").height);
    let smileys = formatSmileys(restaurant.smileys);
    let starPic = (
      <Image style={{ height: 30, width: 30 }} source={require("./star.png")} />
    );

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#e2e2e249",
            flexDirection: "column",
            flex: 1
          }}
        >
          <Text numberOfLines={3} style={styles.NameText}>
            {restaurant.name}
          </Text>
          <Text numberOfLines={1} style={styles.AddressText}>
            {restaurant.address}, {restaurant.zipcode}
          </Text>

          <View style={styles.Smileys}>{smileys}</View>
          <View style={styles.RatingContainer}>
            <Text style={styles.RatingText}>{textRating}</Text>
            {starPic}
          </View>
          <Text style={styles.StarText}>{textStar}</Text>
          <StarRating
            containerStyle={styles.StarContainer}
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
          <Map restaurant={restaurant}></Map>
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
