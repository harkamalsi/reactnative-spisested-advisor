import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import Select2 from "react-native-select-two";

const smileyAlternatives = [
  { id: "Smil", name: "Smil" },
  { id: "Nøytral", name: "Nøytral" },
  { id: "Sur", name: "Sur" }
];

const orderAlternative = [
  { id: "NAME_AZ", name: "Navn A-Å", checked: true },
  { id: "NAME_ZA", name: "Navn Å-A" },
  { id: "SMILEY_DESC", name: "Fjes Glad-Sur" },
  { id: "SMILEY_ASC", name: "Fjes Sur-Glad" }
];
const HomeScreen = props => {
  const [name, setName] = useState("");
  const [cityOptions, updateCityOptions] = useState([]);
  const [smileyOptions, updateSmileyOption] = useState(smileyAlternatives);
  const [orderOptions, setOrderOptions] = useState(orderAlternative);

  const [selectedCities, updateSelectedCities] = useState([]);
  const [selectedSmileys, updateSelectedSmileys] = useState([]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);

  const handleOnPress = () => {
    //On press of search button, build query and send it to result view
    let query = "?name=kebab&orderby=NAME_AZ&cities=&smileys=&page=";
    props.navigation.navigate("Result", { query: query });
  };
  //Load list of cities from server to be used in the city selector component
  useEffect(() => {
    fetch("http://it2810-02.idi.ntnu.no:5000/companies/cities", {})
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
  /*   console.log(
    "cities",
    selectedCities,
    "sortby",
    orderBy,
    "filfjes",
    selectedSmileys
  ); */
  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Søk etter spisesteder</Text>
      <Input placeholder="Navn" />
      <Select2
        isSelectSingle
        style={{ borderRadius: 5 }}
        popupTitle="Sorter etter smilefjes"
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
    </View>
  );
};

export default HomeScreen;
