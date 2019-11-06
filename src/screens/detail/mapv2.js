

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Constants, Location, Permissions } from "expo";

import WebViewLeaflet from "react-native-webview-leaflet";

class Map extends React.component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebViewLeaflet
          ref={component => (webViewLeaflet = component)}
          eventReceiver={this}
          // Optional: the center of the displayed map
          centerPosition={[63.415524, 10.404481]}
          mapLayers={[
            {
              name: "OpenStreetMap",
              checked: "true",
              type: "TileLayer",
              baseLayer: true,
              url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
              attribution:
                "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            }
          ]}
          // Optional: display a marker to be at a given location
          ownPositionMarker={{
            coords: [63.404536, 10.418654],
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
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00ffff",
    height: 400,
    width: 410,
    display: "flex"
  },
  statusBar: {
    height: 100
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: "dodgerblue"
  }
});

export default Map;
