import React, { useEffect } from "react";
import ListRow from "../ListRow/ListRow.js";
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
  function fetchMoreData() {
    //Fetches routine with stored query and append fetched data to already stored
    //only if last char of url (String) is not 0 (page 0, just for error preventing)

    /*  if (props.page !==0) {
      props.fetchMore(props.query + string(props.page);
    } */
    console.log("fetching...");
  }

  //Get the width of the devices screen
  const screenWidth = Math.round(Dimensions.get("window").width);

  return (
    <View style={{ width: screenWidth }}>
      <FlatList
        data={props.listRawData}
        renderItem={({ item }) => (
          <ListRow
            id={item._id}
            rowData={item}
            handleClick={props.handlePress.bind(this)}
          ></ListRow>
        )}
        keyExtractor={item => item._id.toString()}
        onEndReached={fetchMoreData.bind(this)}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default List;

//to connect to store

/* const mapStateToProps = state => {
  return {
    query: state.query,
    page: state.page,
    listRawData: getResturants(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMore: fetchMore
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List); */
