import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import List from "../../components/List/List";

const ResultScreen = props => {
  const [restaurants, setRestaurant] = useState([]);
  const [page, setPage] = useState(0);
  const endpoint = "http://it2810-02.idi.ntnu.no:5050/companies/";
  let query = props.navigation.getParam("query", "NO-QUERY");

  const fetchRestaurants = () => {
    fetch(endpoint + query + page, {
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
        let tmp = [...restaurants];
        res.map(restaurant => {
          tmp.push(restaurant);
        });
        setRestaurant(tmp);
        setPage(page + 1);
      });
  };

  const handlePress = (id, e) => {
    let restaurant = restaurants.filter(restaurant => {
      return restaurant._id === id;
    })[0];
    props.navigation.navigate("Detail", {
      restaurant: restaurant,
      id: restaurant._id,
      onNewRating: updateGlobalRating.bind(this)
    });
  };

  const updateGlobalRating = (id, newSumStars, newNumberOfRatings) => {
    console.log("evaluating render");
    let rowToUpdate = restaurants.filter(restaurant => {
      return restaurant._id === id;
    })[0];
    if (
      rowToUpdate.sumStars !== newSumStars &&
      rowToUpdate.numberOfRatings !== newNumberOfRatings
    ) {
      console.log("render accepted");
      rowToUpdate.sumStars = newSumStars;
      rowToUpdate.numberOfRatings = newNumberOfRatings;
      let newRestarantArray = [...restaurants];
      newRestarantArray[newRestarantArray.indexOf(rowToUpdate)] = rowToUpdate;
      setRestaurant(newRestarantArray);
    }
  };
  const loadMore = () => {};
  useEffect(() => {
    //Fetch restaurants matching query
    fetchRestaurants();
  }, []);
  console.log("rendering list....");
  if (restaurants.length === 0) return <Text>Loading...</Text>;
  else
    return (
      <View style={{ flex: 1 }}>
        <List
          listRawData={restaurants}
          handlePress={handlePress.bind(this)}
          loadMore={fetchRestaurants.bind(this)}
        ></List>
      </View>
    );
};

export default ResultScreen;
