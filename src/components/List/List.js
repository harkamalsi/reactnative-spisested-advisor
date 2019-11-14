import React, { useEffect } from 'react';
import ListRow from '../ListRow/ListRow.js';
import ReducedListRow from '../ReducedListRow/ReducedListRow.js';
import { FlatList, View } from 'react-native';
import { Dimensions } from 'react-native';

/*
    Renders a List like component with clickable rows.

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
            smileys:"(Array of Obj)With a Date(STRING) in format ddmmyyyy and a grade (INT)(0-3)
            numberOfRatings: "(Int)Number of the total ratings ",
            sumStars:"(Int)Sum of all the stars given by the users"
        }, ...
    ]

*/

const List = props => {
  //Get the width of the devices screen
  const screenWidth = Math.round(Dimensions.get('window').width);
  //Renders a list with ListRow components if there are enought information,
  //otherwise uses ReducedListRow components
  return (
    <View style={{ width: screenWidth }}>
      <FlatList
        extraData={props.listRawData}
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
