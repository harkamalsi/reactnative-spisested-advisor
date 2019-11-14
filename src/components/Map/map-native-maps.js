import React from 'react';
import MapView from 'react-native-maps';

import { StyleSheet, Dimensions, View, Text } from 'react-native';

const Map = props => {
  let coords = props.restaurant.coordinates;
  let noCoords = coords === null ? true : false;

  if (noCoords) {
    // coordinates to gløshaugen
    coords = [63.41557, 10.404599];
  }

  // calculate aspect ratio to center the map on marker
  const { width, height } = Dimensions.get('window');
  const apsect_ratio = width / height;
  const lat = coords[0];
  const lng = coords[1];
  const northeastLat = lat + 0.05;
  const southwestLat = lat - 0.05;
  const latDelta = northeastLat - southwestLat;
  const lngDelta = latDelta * apsect_ratio;

  const latlng = { latitude: lat, longitude: lng };
  const initialLatlng = {
    ...latlng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta
  };

  let popupText = props.restaurant.address + ' ' + props.restaurant.city;

  const coordsMarker = () => {
    return (
      <MapView.Marker
        coordinate={latlng}
        title={props.restaurant.name}
        description={popupText}
      ></MapView.Marker>
    );
  };

  const noCoordsMarker = () => {
    return (
      <MapView.Marker coordinate={latlng}>
        <View
          {...marker}
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 5,
            borderRadius: 20
          }}
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
  }
});

export default Map;
