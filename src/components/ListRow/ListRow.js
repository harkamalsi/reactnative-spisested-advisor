import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Smiley from "../Smiley/Smiley.js";
import styles from "./ListRow-Styles.js";

const ListRow = props => {
  let row = props.rowData;
  let stars =
    row.numberOfRatings === 0
      ? "No rating yet"
      : (row.sumStars / row.numberOfRatings).toFixed(2).toString() + "/5";

  let pic = <Image style={styles.Star} source={require("./star.png")} />;
  return (
    //container for the all row (will have 3 coloumns )
    <TouchableOpacity onPress={e => props.handleClick(row._id, e)}>
      <View style={styles.Row}>
        <View style={styles.TextColumn}>
          <Text style={styles.TextName}>{row.name}</Text>
          <Text style={styles.TextCity}>{row.city}</Text>
        </View>
        <Smiley style={styles.SmileyColumn} year={2019} value={1} />
        <View style={styles.RatingColumn}>
          <Text style={styles.TextRating}>{stars}</Text>
          {pic}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ListRow;
