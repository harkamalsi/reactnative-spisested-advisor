import React from "react";
import MapView from "react-native-maps";
import Marker from "react-native-maps";

import { StyleSheet, Text, View, Dimensions } from "react-native";

const coordinate = {
  latitude: 63.404536,
  longitude: 10.418654
};

const Map = props => {
  console.log(props);
  return (
    <MapView style={styles.mapStyle}>
      <MapView.Marker
        coordinate={{
          latitude: props.restaurant.coordinates[0],
          longitude: props.restaurant.coordinates[1]
        }}
        title={props.restaurant.name}
        description={props.restaurant.address + " " + props.restaurant.city}
      />
    </MapView>
  );
};

/* export default class App extends React.Component {
  constructor (props){
    super(props)
  };
  console.log(props);
  render() {
    return (
        <MapView style={styles.mapStyle}>
        <MapView.Marker
          coordinate={{
            latitude: this.props.retaurant.coordinates[0],
            longitude: this.props.retaurant.coordinates[1]
          }}

          title={"lol"}
          
          description={"marker.description"}
        />
        </MapView>
    );
  }
}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default Map;
