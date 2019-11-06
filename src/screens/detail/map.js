import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Constants, Location, Permissions } from 'expo';


import WebViewLeaflet from "react-native-webview-leaflet";

const Map = (props) => {
  const mapLayers = [{name: 'OpenStreetMap',
  checked: 'true',
  type: 'TileLayer',
  baseLayer: true,
  url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
  attribution:
    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  }];
  return (
    <View style={styles.container}>

    <WebViewLeaflet
      ref={component => (webViewLeaflet = component)}
      // Optional: a callback that will be called when the map is loaded
      //onLoad={this.onLoad}
      // Optional: the component that will receive map events}
      eventReceiver={this}
      // Optional: the center of the displayed map
      centerPosition={[63.415524, 10.404481]}
      // Optional: a list of markers that will be displayed on the map
       markers={[63.40, 10.41, 63.43, 10.42, 63.41, 10.40, 63.415524, 10.40]}
       // Required: the map layers that will be displayed on the map. See below for a description of the map layers object
      mapLayers={mapLayers}
      // Optional: display a marker to be at a given location
      ownPositionMarker={{
        coords: props.coordinates,
        icon: "❤️",
        size: [24, 24],
        animation: {
          name: "pulse",
          duration: ".5",
          delay: 0,
          interationCount: "infinite"
        }
      }}
      // Optional (defaults to false): display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
      centerButton={true}
      // Optional (defaults to false): cluster icons that are in the same area
      useMarkerClustering={true}
    />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00ffff',
    height: 400, width: 410,
    display: 'flex'
  },
  statusBar: {
    height: 100
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'dodgerblue'
  }
});

export default Map;
