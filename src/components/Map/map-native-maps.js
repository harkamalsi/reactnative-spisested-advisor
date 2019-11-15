import React from "react";
import MapView from "react-native-maps";

import { StyleSheet, Dimensions, View, Text } from "react-native";

const Map = props => {
  let coords = props.restaurant.coordinates;
  let noCoords = coords === null ? true : false;

  // if there are no coordinates related to the restaurant, set coordinates to a default value
  // which in this case is Gløshaugen
  if (noCoords) {
    coords = [63.41557, 10.404599];
  }

  // calculate aspect ratio to center the map on and zoomlevel
  // inspired by: https://stackoverflow.com/a/53868257/9085724
  const { width, height } = Dimensions.get("window");
  const apsect_ratio = width / height;
  const lat = coords[0];
  const lng = coords[1];
  const northeastLat = lat + 0.05;
  const southwestLat = lat - 0.05;
  const latDelta = northeastLat - southwestLat;
  const lngDelta = latDelta * apsect_ratio;

  // coordinates for a restaurant
  const latlng = { latitude: lat, longitude: lng };

  // specifies which region the map should show on first load, and zoomlevel.
  const initialLatlng = {
    ...latlng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta
  };

  // a string with the address to the restaurant, which is shown when a marker is clicked
  let popupText = props.restaurant.address + " " + props.restaurant.city;

  // marks the restaurant on the map
  const coordsMarker = () => {
    return (
      <MapView.Marker
        coordinate={latlng}
        title={props.restaurant.name}
        description={popupText}
      ></MapView.Marker>
    );
  };

  // displays a message if there are no coordinates available
  const noCoordsMarker = () => {
    return (
      <MapView.Marker coordinate={latlng}>
        <View
          {...marker}
          style={styles.noCoords}
        >
          <Text style={{ fontSize: 20 }}>
            Position of restaurant not available
          </Text>
        </View>
      </MapView.Marker>
    );
  };

  const marker = noCoords ? noCoordsMarker() : coordsMarker();

  return (
    <MapView style={styles.mapStyle} initialRegion={initialLatlng}>
      {marker}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  noCoords: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 20
  }
});

export default Map;
