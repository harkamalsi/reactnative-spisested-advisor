import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import Select2 from "react-native-select-two";

const smileyAlternatives = [
  { id: "0", name: "Happy" },
  { id: "2", name: "Neutral" },
  { id: "3", name: "Sad" }
];

const orderAlternative = [
  { id: "NAME_AZ", name: "Name A-Å", checked: true },
  { id: "NAME_ZA", name: "Name Å-A" },
  { id: "SMILEY_DESC", name: "Smiley Happy-Sad" },
  { id: "SMILEY_ASC", name: "Smiley Sad-Happy" }
];
const HomeScreen = props => {
  //Here are the possible options for the 3 selectors. Unfortunately it had to be
  //a state-like with hooks otherwise i wouldn´t work with the Select2 components
  const [cityOptions, updateCityOptions] = useState([]);
  const [smileyOptions, updateSmileyOption] = useState(smileyAlternatives);
  const [orderOptions, setOrderOptions] = useState(orderAlternative);

  //Those are the parameters that will be changed according the ui inputs.
  //Then they will be used for building a query to send to the server
  const [name, setName] = useState("");
  const [selectedCities, updateSelectedCities] = useState([]);
  const [selectedSmileys, updateSelectedSmileys] = useState([]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);

  const handleOnPress = () => {
    //On press of search button, build query and send it to result view

    //Build cities filter string for query
    let citiesString = "";
    selectedCities.forEach(city => {
      citiesString = citiesString + (citiesString.length > 0 ? "-" : "") + city;
    });
    //Build smiley filter string for query
    let smileysString = "";
    selectedSmileys.forEach(element => {
      smileysString =
        smileysString + (smileysString.length > 0 ? "-" : "") + element;
      if (element === "0") smileysString = smileysString + "-" + "1";
    });
    let query =
      "?name=" +
      name +
      "&orderby=" +
      orderBy +
      "&cities=" +
      citiesString +
      "&smileys=" +
      smileysString +
      "&page=";
    // Props the query to the result screen that will do the fetching
    props.navigation.navigate("Result", { query: query });
  };
  //Load list of cities from server to be used in the city selector component
  useEffect(() => {
    fetch("http://it2810-02.idi.ntnu.no:5050/companies/cities", {})
      .then(res => res.json())
      .then(
        result => {
          updateCityOptions(
            result[0].cities.sort().map(city => ({ id: city, name: city }))
          );
        },
        error => {
          console.log(error, "Error while loading cities from server"); //catch an error and throw a fail message
        }
      );
  }, []);

  const colorTheme = "#16a45f"

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Search after eateries</Text>
      <Input placeholder="Name" onChangeText={text => setName(text)} />
      <Select2
        isSelectSingle
        style={{ borderRadius: 5 }}
        showSearchBox={false}
        popupTitle="Select an alternative"
        title="Sort by"
        cancelButtonText="Cancel"
        selectButtonText="Select"
        searchPlaceHolderText="Search after an smiley"
        listEmptyTitle="No smileys with that name"
        colorTheme={colorTheme}
        data={orderOptions}
        onSelect={data => {
          setOrderBy(data);
        }}
        onRemoveItem={data => {
          setOrderBy(data);
        }}
      />
      <Select2
        style={{ borderRadius: 5 }}
        popupTitle="Select one or more cities"
        title="Filter by cities"
        cancelButtonText="Cancel"
        selectButtonText="Select"
        searchPlaceHolderText="Search after a city"
        listEmptyTitle="No city with that name"
        colorTheme={colorTheme}
        data={cityOptions}
        onSelect={data => {
          updateSelectedCities(data);
        }}
        onRemoveItem={data => {
          updateSelectedCities(data);
        }}
      />
      <Select2
        style={{ borderRadius: 5 }}
        showSearchBox={false}
        popupTitle="Select one or more smileys"
        title="Filter by smileys"
        cancelButtonText="Cancel"
        selectButtonText="Select"
        searchPlaceHolderText="Search after a smiley"
        listEmptyTitle="No smileys with that name"
        colorTheme={colorTheme}
        data={smileyOptions}
        onSelect={data => {
          updateSelectedSmileys(data);
        }}
        onRemoveItem={data => {
          updateSelectedSmileys(data);
        }}
      />
      <Button title="Search!" onPress={handleOnPress.bind(this)} />
    </View>
  );
};

export default HomeScreen;
