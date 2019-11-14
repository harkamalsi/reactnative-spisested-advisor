import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import Select2 from "react-native-select-two";
import styles from "./styling-home";

const smileyAlternatives = [
  { id: "0", name: "Smil" },
  { id: "2", name: "Nøytral" },
  { id: "3", name: "Sur" }
];

const orderAlternative = [
  { id: "NAME_AZ", name: "Navn A-Å", checked: true },
  { id: "NAME_ZA", name: "Navn Å-A" },
  { id: "SMILEY_DESC", name: "Fjes Glad-Sur" },
  { id: "SMILEY_ASC", name: "Fjes Sur-Glad" }
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

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <ImageBackground
        source={require("./restaurant-background.jpg")}
        style={styles.Background}
        imageStyle={styles.BackgroundPicture}
      >
        <Text style={{ fontSize: 20 }}>Søk etter spisesteder</Text>
        <Input placeholder="Navn" onChangeText={text => setName(text)} />
        <Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          showSearchBox={false}
          popupTitle="Velg en alternativ"
          title="Sorter etter"
          cancelButtonText="Avbryt"
          selectButtonText="Velg"
          searchPlaceHolderText="Søk etter en smilefjes"
          listEmptyTitle="Ingen smilefjes med det navnet"
          colorTheme="#16a45f"
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
          popupTitle="Velg en eller flere byer"
          title="Filtrer etter by"
          cancelButtonText="Avbryt"
          selectButtonText="Velg"
          searchPlaceHolderText="Søk etter en by"
          listEmptyTitle="Ingen by med den navnet"
          colorTheme="#16a45f"
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
          popupTitle="Velg en eller flere smilefjes"
          title="Filtrer etter smilefjes"
          cancelButtonText="Avbryt"
          selectButtonText="Velg"
          searchPlaceHolderText="Søk etter en smilefjes"
          listEmptyTitle="Ingen smilefjes med den navnet"
          colorTheme="#16a45f"
          data={smileyOptions}
          onSelect={data => {
            updateSelectedSmileys(data);
          }}
          onRemoveItem={data => {
            updateSelectedSmileys(data);
          }}
        />
        <Button title="Search!" onPress={handleOnPress.bind(this)} />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
