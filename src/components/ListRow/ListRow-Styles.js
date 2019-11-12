import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Row: {
    flexDirection: "row",
    backgroundColor: "#e2e2e249",
    justifyContent: "space-between",
    height: 80
  },
  TextColumn: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  SmileyColumn: {
    flex: 3,
    alignSelf: "center"
  },
  RatingColumn: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  Star: {
    height: 30,
    width: 30,
    alignSelf: "center",
    margin: 10
  },
  TextName: {
    fontSize: 20,
    fontWeight: "200",
    flex: 2
  },
  TextCity: {
    fontSize: 15,
    fontWeight: "100",
    flex: 1
  },
  TextRating: {
    fontSize: 20,
    fontWeight: "400",
    alignSelf: "center"
  }
});
