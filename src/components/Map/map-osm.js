import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import WebViewLeaflet from "react-native-webview-leaflet";

/* class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: null,
      errorMessage: null,

      //markers: testLocations,
      markers: [],
      currentLocation: undefined,
      mapCenterPosition: undefined,
      showEmojiSelectorModal: false,
      mapState: {
        showAttributionControl: false,
        showZoomControls: false,
        panToLocation: false,
        zoom: 10
      }
    };

  }



  render() {
  const mapLayers = [
    {
      name: "OpenStreetMap",
      checked: "true",
      type: "TileLayer",
      baseLayer: true,
      url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
      attribution:
        "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    }
  ];

  let nameOfRestaurant = "<p class='speech-bubble'>Burger King </p>"
  let icons = "📍";

  let popUp = {
    // zoom: 12,
    locations: [
      {
        coords: this.props.coordinates,
        icon: nameOfRestaurant,
        size: [64, 64]
      }
    ]
  };
    return (
      <View style={styles.container}>
      <WebViewLeaflet
        ref={component => (webViewLeaflet = component)}
        // Optional: a callback that will be called when the map is loaded
        onLoad={this.onLoad}
        // Optional: the component that will receive map events}
        eventReceiver={this}
        // Optional: the center of the displayed map
        centerPosition={[63.415524, 10.404481]}
        // Optional: a list of markers that will be displayed on the map
        markers={[63.4, 10.41, 63.43, 10.42, 63.41, 10.4, 63.415524, 10.4]}
        // Required: the map layers that will be displayed on the map. See below for a description of the map layers object
        mapLayers={mapLayers}
        // Optional: display a marker to be at a given location
        ownPositionMarker={{
          coords: this.props.coordinates,
          icon: icons,
          size: [36, 36]
        }}
        // Optional (defaults to false): display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
        centerButton={true}
        // Optional (defaults to false): cluster icons that are in the same area
        useMarkerClustering={true}
      />
    </View>
    );
  }
} */

const Map = props => {
  // setState is a empty function becuase WebViewLeaflet.js expects a stateful component
  // we dont need a stateful component
  setState = () => {};

  const mapLayers = [
    {
      name: "OpenStreetMap",
      checked: "true",
      type: "TileLayer",
      baseLayer: true,
      url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
      attribution:
        "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    }
  ];
  // to edit the style of the speech-bubble, go to node_modules\react-native-webview-leaflet\assets\dist\index.html

  let popupText =
    "<p class='speech-bubble'>" +
    props.restaurant.name +
    "<br> " +
    props.restaurant.city +
    "</p>";
  let center = props.restaurant.coordinates;
  let pin = "📍";
  let ownPositionMarker;

  let noCoords = center === null ? true : false;

  if (noCoords) {
    // coordinates to gløshaugen
    center = [63.41557, 10.404599];
    popupText = "<p class='speech-bubble'> No coordinates available </p>";
  }

  ownPositionMarker = {
    coords: center,
    icon: noCoords ? popupText : pin
  };

  let popUp = {
    locations: [
      {
        coords: center,
        icon: popupText
      }
    ]
  };

  onMapMarkerClicked = ({ payload }) => {
    // show more info when marker is clicked
    if (!noCoords) {
      if (payload.id !== undefined) {
        console.log(`Marker Clicked: ${payload.id}`);
        // adds a marker which is a popup with restaurant info
        this.webViewLeaflet.sendMessage(popUp);
      } else {
        // if the popup is clicked again, send a empty list of locations to the map
        // so that the popup is hidden
        this.webViewLeaflet.sendMessage({ locations: [] });
      }
    }
  };

  return (
    <View style={styles.mapContainer}>
      <WebViewLeaflet
        style={styles.mapContainer}
        ref={component => (webViewLeaflet = component)}
        // the component that will receive map events
        eventReceiver={this}
        zoom={13}
        // coordinates for the center of the map
        centerPosition={center}
        // map layers that will be displayed on the map. See below for a description of the map layers object
        mapLayers={mapLayers}
        // Optional: display a marker to be at a given location
        ownPositionMarker={ownPositionMarker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    //...StyleSheet.absoluteFillObject,
    /* width: Dimensions.get("window").width,*/
    //height: Dimensions.get("window").height,

    flex: 1
    //flex: 0.5
  }
});

export default Map;
