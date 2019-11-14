import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Background: {},
  Container: { width: "100%", height: "100%", justifyContent: "space-around" },
  BackgroundPicture: {
    opacity: 0.4
  },
  ButtonBox: {
    flex: 1,
    justifyContent: "center"
  },
  Button: {
    backgroundColor: "#16a45f",
    borderRadius: 10,
    width: "50%",
    justifyContent: "center",
    alignSelf: "center"
  },
  SelectorGroup: {
    flex: 1.5,
    width: "75%",
    justifyContent: "space-evenly",
    alignSelf: "center",
    opacity: 0.9
  },
  Selector: {
    borderRadius: 5,
    height: 20,
    backgroundColor: "white"
  },
  InputSelector: {
    width: "50%",
    borderRadius: 5,
    backgroundColor: "white"
  },
  TitleBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  Title: {
    fontSize: 40,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 30,
    fontWeight: "600",
    color: "#404241"
  }
});
