import React, { useState, useEffect } from "react";
import { Text, View, AsyncStorage } from "react-native";
import List from "../../components/List/List";

const FavoritesScreen = props => {
  const [favorites, setFavorites] = useState(null);

  const handlePress = (id, e) => {
    props.navigation.navigate("Detail", {
      id: id
    });
  };

  const getStorage = async () => {
    let storageValue;
    try {
      storageValue = await AsyncStorage.getItem("@favorites");
      if (storageValue) return JSON.parse(storageValue);
    } catch (err) {
      console.log("ERROR GETTING", err);
    }
  };

  useEffect(() => {
    //Add an event listener that is triggered each time this tab is selected(focused)
    props.navigation.addListener("didFocus", () => {
      //fetches favourite restaurants from async storage
      fetchfavoritesRestaurants();
    });
    fetchfavoritesRestaurants();
  }, []);

  const fetchfavoritesRestaurants = async () => {
    let storageValue = await getStorage();
    if (favorites !== storageValue) setFavorites(storageValue);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>All your favorites restaurants</Text>
      <List listRawData={favorites} handlePress={handlePress.bind(this)}>
        {" "}
      </List>
    </View>
  );
};

export default FavoritesScreen;
