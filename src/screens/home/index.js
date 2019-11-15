import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Select2 from 'react-native-select-two';
import styles from './styling-home';

const smileyAlternatives = [
  { id: '0', name: 'Happy' },
  { id: '2', name: 'Neutral' },
  { id: '3', name: 'Sad' }
];

const orderAlternative = [
  { id: 'NAME_AZ', name: 'Name A-Z', checked: true },
  { id: 'NAME_ZA', name: 'Name Z-A' },
  { id: 'SMILEY_DESC', name: 'Smiley Happy-Sad' },
  { id: 'SMILEY_ASC', name: 'Smiley Sad-Happy' }
];
const HomeScreen = props => {
  //Here are the possible options for the 3 selectors. Unfortunately it had to be
  //a state-like with hooks otherwise i wouldn´t work with the Select2 components
  const [cityOptions, updateCityOptions] = useState([]);
  const [smileyOptions, updateSmileyOption] = useState(smileyAlternatives);
  const [orderOptions, setOrderOptions] = useState(orderAlternative);

  //Those are the parameters that will be changed according the ui inputs.
  //Then they will be used for building a query to send to the server
  const [name, setName] = useState('');
  const [selectedCities, updateSelectedCities] = useState([]);
  const [selectedSmileys, updateSelectedSmileys] = useState([]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);

  const handleOnPress = () => {
    //On press of search button, build query and send it to result view

    //Build cities filter string for query
    let citiesString = '';
    selectedCities.forEach(city => {
      citiesString = citiesString + (citiesString.length > 0 ? '-' : '') + city;
    });
    //Build smiley filter string for query
    let smileysString = '';
    selectedSmileys.forEach(element => {
      smileysString =
        smileysString + (smileysString.length > 0 ? '-' : '') + element;
      if (element === '0') smileysString = smileysString + '-' + '1';
    });
    let query =
      '?name=' +
      name +
      '&orderby=' +
      orderBy +
      '&cities=' +
      citiesString +
      '&smileys=' +
      smileysString +
      '&page=';
    // Props the query to the result screen that will do the fetching
    props.navigation.navigate('Result', { query: query });
  };
  //Load list of cities from server to be used in the city selector component
  useEffect(() => {
    fetch('http://it2810-02.idi.ntnu.no:5050/companies/cities', {})
      .then(res => res.json())
      .then(
        result => {
          updateCityOptions(
            result[0].cities.sort().map(city => ({ id: city, name: city }))
          );
        },
        error => {
          console.log(error, 'Error while loading cities from server'); //catch an error and throw a fail message
        }
      );
  }, []);

  const colorTheme = '#16a45f';

  return (
    <ImageBackground
      source={require('./restaurant-background.jpg')}
      style={styles.Container}
      imageStyle={styles.BackgroundPicture}
    >
      <View style={styles.TitleBox}>
        <Text style={styles.Title}>Spisested Adviser</Text>
      </View>
      <View style={styles.SelectorGroup}>
        <Text style={styles.inputText}>Search by name</Text>

        <Input
          placeholder='e.g McDonald'
          inputStyle={styles.Selector}
          containerStyle={{
            paddingHorizontal: 0
          }}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.inputText}>Order by:</Text>

        <Select2
          isSelectSingle
          style={styles.Selector}
          showSearchBox={false}
          popupTitle='Choose an option'
          title='Order by'
          cancelButtonText='Cancel'
          selectButtonText='Choose'
          searchPlaceHolderText='Search'
          listEmptyTitle='Nothing'
          colorTheme={colorTheme}
          data={orderOptions}
          onSelect={data => {
            setOrderBy(data);
          }}
          onRemoveItem={data => {
            setOrderBy(data);
          }}
        />
        <Text style={styles.inputText}>Filter by city</Text>

        <Select2
          style={styles.Selector}
          popupTitle='Choose one or more cities'
          title='e.g Oslo'
          cancelButtonText='Cancel'
          selectButtonText='Choose'
          searchPlaceHolderText='Search by city name'
          listEmptyTitle='No city by that name'
          colorTheme={colorTheme}
          data={cityOptions}
          onSelect={data => {
            updateSelectedCities(data);
          }}
          onRemoveItem={data => {
            updateSelectedCities(data);
          }}
        />
        <Text style={styles.inputText}>Filter by last Smiley</Text>

        <Select2
          style={styles.Selector}
          showSearchBox={false}
          popupTitle='Choose one or more Smileys'
          title='e.g Happy'
          cancelButtonText='Cancel'
          selectButtonText='Choose'
          searchPlaceHolderText='Search Smileys'
          listEmptyTitle='Nothing'
          colorTheme={colorTheme}
          data={smileyOptions}
          onSelect={data => {
            updateSelectedSmileys(data);
          }}
          onRemoveItem={data => {
            updateSelectedSmileys(data);
          }}
        />
      </View>
      <View style={styles.ButtonBox}>
        <Button
          title='Search!'
          buttonStyle={styles.Button}
          onPress={handleOnPress.bind(this)}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
