import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import List from "../../components/List/List";

const data = [
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 1
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 2
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 3
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 4
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 5
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 6
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 7
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 8
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 9
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 10
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 11
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 12
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 13
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 14
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 15
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 16
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 17
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 18
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 19
  },
  {
    name: "Lang navn ok?",
    city: "Trondheim",
    sumStars: 122,
    numberOfRatings: 20,
    _id: 20
  }
];
const ResultScreen = props => {
  const handlePress = (id, e) => {
    console.log("clicked!");
    console.log(id);
    props.navigation.navigate("Detail", {
      id: id
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Results</Text>

      <List listRawData={data} handlePress={handlePress.bind(this)}></List>
    </View>
  );
};

export default ResultScreen;
