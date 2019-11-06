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

  // https://commons.wikimedia.org/wiki/File:Speech_Bubble_(89379)_-_The_Noun_Project.svg
  let svg1 = '<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M81.2,22.7H18c-4.6,0-8.4,3.8-8.4,8.4v38c0,4.6,3.8,8.4,8.4,8.4h7.3l6.3,8.3c0.3,0.4,1.3,1.5,2.7,1.5c0.9,0,1.8-0.5,2.6-1.6  l6.2-8.3h38.2c4.6,0,8.4-3.8,8.4-8.4v-38C89.6,26.4,85.8,22.7,81.2,22.7z M88.4,69.1c0,3.9-3.2,7.1-7.1,7.1H42.7  c-0.2,0-0.4,0.1-0.5,0.2L35.8,85c-0.5,0.7-1.1,1.1-1.6,1.1c-0.9,0-1.6-0.9-1.7-1.1L26,76.5c-0.1-0.2-0.3-0.2-0.5-0.2H18  c-3.9,0-7.1-3.2-7.1-7.1v-38c0-3.9,3.2-7.1,7.1-7.1h63.3c3.9,0,7.1,3.2,7.1,7.1V69.1z M74.4,50.4c0,0.3-0.3,0.6-0.6,0.6H25.2  c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h48.5C74.1,49.8,74.4,50.1,74.4,50.4z M74.4,61.5c0,0.3-0.3,0.6-0.6,0.6H25.2  c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6h48.5C74.1,60.8,74.4,61.1,74.4,61.5z M24.6,39.5c0-0.3,0.3-0.6,0.6-0.6h29.3  c0.3,0,0.6,0.3,0.6,0.6c0,0.3-0.3,0.6-0.6,0.6H25.2C24.9,40.1,24.6,39.8,24.6,39.5z"></path></svg>'; 
  let svg2 = '<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg"><!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --><g><title>background</title><rect fill="#fff" id="canvas_background" height="402" width="502" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><path id="svg_1" d="m118,242l64,-153l63,157c0,0 45,-71 49,-68c4,3 11,146 12,146c1,0 -173,-7 -173,-7c0,0 -61,-72 -61,-72c0,0 110,-156 46,-3z" fill-opacity="0.7" stroke-width="2" stroke="#995757" fill="#995757"/></g></svg>'
  let nameOfRestaurant = "<p style='background-color:white;'>Burger King</p>"
  let icons = "📍" 

  let popUp = {
    locations: [{
      coords: props.coordinates, 
      icon: nameOfRestaurant,
      size: [64, 64],
    }]
  }

  onMapMarkerClicked = ({ payload }) => {
    if (payload.id !== undefined){
      console.log(`Marker Clicked: ${payload.id}`);
      icons = icons === "📍" ? nameOfRestaurant : "📍"; 
      console.log(icons);

      this.webViewLeaflet.sendMessage(popUp);
    }
  };

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
        icon: icons,
        size: [36, 36],
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
