import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Row: {
    flexDirection: "row",
    backgroundColor: "#e2e2e249",
    justifyContent: "space-between",
    height: 80
  },
  NameColumn: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 10
  },
  CityColumn: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  },
  RatingColumn: {
    flex: 2,
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
    flex: 2,
    alignSelf: "center"
  },
  TextCity: {
    fontSize: 15,
    fontWeight: "100",
    flex: 1,
    alignSelf: "center"
  },
  TextRating: {
    fontSize: 20,
    fontWeight: "400",
    alignSelf: "center"
  }
});
