import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Smiley from '../Smiley/Smiley.js';
import styles from './ListRow-Styles.js';

/*
    Renders a List row component.

    Props from parent:
    {rowData} = An object with raw data
        each element of the array will be displayed as a row.
    {handlePress} = Triggers a navigation to a detailed view for a given row
    {rowData} =()
            id: "(Int)Unique ID for Business
            name: "(String)Name of the business",
            address: "(String)Adress without postcode"
            postcode: "(String)Postcode"
            city: "(String)City name",
            smileys:"(Array of Obj)With a Date(STRING) in format ddmmyyyy and a grade (INT)(0-3)
            numberOfRatings: "(Int)Number of the total ratings ",
            sumStars:"(Int)Sum of all the stars given by the users"
        }
*/
const ListRow = props => {
  let row = props.rowData;
  let stars =
    row.numberOfRatings === 0
      ? 'No ratings'
      : (row.sumStars / row.numberOfRatings).toFixed(2).toString() + '/5';

  let pic = <Image style={styles.Star} source={require('./star.png')} />;
  return (
    //container for the all row (will have 3 coloumns )
    <TouchableOpacity onPress={e => props.handleClick(row._id, e)}>
      <View style={styles.Row}>
        <View style={styles.TextColumn}>
          <Text numberOfLines={2} style={styles.TextName}>
            {row.name}
          </Text>
          <Text style={styles.TextCity}>{row.city}</Text>
        </View>
        <View style={styles.SmileyColumn}>
          <Smiley
            year={row.smileys[0].date.substring(4)}
            value={row.smileys[0].grade}
          />
        </View>
        <View style={styles.RatingColumn}>
          <Text style={styles.TextRating}>{stars}</Text>
          {pic}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ListRow;
