import { StyleSheet } from "react-native";

export default StyleSheet.create({
  NameText: {
    flex: 1.7,
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center"
  },
  AddressText: {
    flex: 0.6,
    fontSize: 17,
    fontWeight: "200",
    alignSelf: "center"
  },
  Smileys: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  RatingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  RatingText: {
    fontSize: 20,
    fontWeight: "400",
    alignSelf: "center",
    marginRight: 5
  },
  StarText: {
    flex: 0.6,
    fontSize: 20,
    fontWeight: "200",
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "center"
  },
  StarContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
