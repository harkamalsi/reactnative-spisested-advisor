import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Row: {
    flexDirection: "row",
    backgroundColor: "#e2e2e249",
    justifyContent: "space-between",
    height: 80
  },
  TextColumn: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  SmileyColumn: {
    alignSelf: "center"
  },
  RatingColumn: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  Star: {
    height: 30,
    width: 30,
    alignSelf: "center"
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
