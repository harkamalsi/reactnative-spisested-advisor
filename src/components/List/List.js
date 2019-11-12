import React, { useEffect } from "react";
import ListRow from "../ListRow/ListRow.js";
import ReducedListRow from "../ReducedListRow/ReducedListRow.js";
import { FlatList, View } from "react-native";
import { Dimensions } from "react-native";

//import "./List.css";
//import fetchMore from "../../fetchDataAction/fetchMoreResturants";
//import { bindActionCreators } from "redux";
//import { connect } from "react-redux";
//import { getResturants } from "../../reducers/fetchResturantsReducer";

/*
    Renders a List like component with expandable rows.

    Props:
    {listRawData} = A list of object with raw data (needs formatting)
        each element of the array will be displayed as a row.
    {handlePress} = Triggers a navigation to a detailed view for a given row
    {loadMore} = It loads more data from server with the same query and incrementing page
    {listRawData} =(Array) [
        {
            id: "(Int)Unique ID for Business
            name: "(String)Name of the business",
            address: "(String)Adress without postcode"
            postcode: "(String)Postcode"
            city: "(String)City name",
            smileys:"(String)Formatted as each review $date$'-'$resultValue(0-3)$ 
                Each revies is separated by a '.' ",
            numberOfRatings: "(Int)Number of the total ratings ",
            sumStars:"(Int)Sum of all the stars given by the users"
        }, ...
    ]

*/

const List = props => {
  //Get the width of the devices screen
  const screenWidth = Math.round(Dimensions.get("window").width);
  //Renders a list with ListRow components if there are enought information,
  //otherwise uses ReducedListRow components
  return (
    <View style={{ width: screenWidth }}>
      <FlatList
        data={props.listRawData}
        renderItem={({ item }) =>
          item.smileys !== undefined ? (
            <ListRow
              id={item._id}
              rowData={item}
              handleClick={props.handlePress.bind(this)}
            ></ListRow>
          ) : (
            <ReducedListRow
              id={item._id}
              rowData={item}
              handleClick={props.handlePress.bind(this)}
            ></ReducedListRow>
          )
        }
        keyExtractor={item => item._id.toString()}
        onEndReached={props.loadMore}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default List;
