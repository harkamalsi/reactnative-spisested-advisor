import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import ListRow from "../../components/ListRow/ListRow";
//exempel av en rad
const rowData = {
  name: "Lang navn ok?",
  city: "Trondheim",
  sumStars: 122,
  numberOfRatings: 20,
  _id: 1
};
class ResultScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Results</Text>
        <Button
          title="Restaurant"
          onPress={() => this.props.navigation.navigate("Detail")}
        />
        <ListRow rowData={rowData}></ListRow>
      </View>
    );
  }
}

export default ResultScreen;
