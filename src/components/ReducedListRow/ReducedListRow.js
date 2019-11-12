import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./ReducedListRow-Styles.js";

/*
    Renders a Reduced List row component.

    Props from parent:
    {rowData} = An object with raw data
        each element of the array will be displayed as a row.
    {handlePress} = Triggers a navigation to a detailed view for a given row
    {rowData} =()
            id: "(Int)Unique ID for Business
            name: "(String)Name of the business",
            address: "(String)Adress without postcode"
            numberOfRatings: "(Int)Number of the total rating (hardcoded 1, for compatibility reasons) ",
            sumStars:"(Int)Sum of all the stars given by the user"
        }
*/
const ReducedListRow = props => {
  let row = props.rowData;
  let stars = row.sumStars.toString() + "/5";

  let pic = <Image style={styles.Star} source={require("./star.png")} />;
  //console.log("rowData", props.rowData);
  return (
    //container for the all row (will have 3 coloumns )
    <TouchableOpacity onPress={e => props.handleClick(row._id, e)}>
      <View style={styles.Row}>
        <View style={styles.NameColumn}>
          <Text numberOfLines={3} style={styles.TextName}>
            {row.name}
          </Text>
        </View>
        <View style={styles.CityColumn}>
          <Text style={styles.TextCity}>{row.city}</Text>
        </View>
        <View style={styles.RatingColumn}>
          <Text style={styles.TextRating}>{stars}</Text>
          {pic}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ReducedListRow;
