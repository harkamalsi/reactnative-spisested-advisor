import React from "react";
import { View, Text, Image } from "react-native";
/* import Smiley_happy from "./smiley-happy.svg";
import Smiley_neutral from "./smiley-neutral.svg";
import Smiley_sad from "./smiley-neutral.svg"; */

import styles from "./Smiley-Styles.js";
//It renderes a smiley component for the given rating
//and display the date (as props) under

//Props:
//value (rating to show, see under for possibles values)
//year (Year to show under)
//
// 0,1 ==> Happy smiley
// 2   ==> Neutral smiley
// 3   ==> Sad smiley

const Smiley = props => {
  let value = props.value;
  let pic = null;
  if (value === 0 || value === 1)
    pic = (
      <Image
        style={styles.Image}
        resizeMode="contain"
        source={require("./smiley-happy.png")}
      />
    );
  else if (value === 2)
    pic = (
      <Image
        style={styles.Image}
        resizeMode="contain"
        source={require("./smiley-neutral.png")}
      />
    );
  else if (value === 3)
    pic = (
      <Image
        style={styles.Image}
        resizeMode="contain"
        source={require("./smiley-sad.png")}
      />
    );
  else pic = <div>Ikke</div>;
  return (
    <View>
      {pic}
      <Text style={styles.Text}>{props.year}</Text>
    </View>
  );
};
export default Smiley;
