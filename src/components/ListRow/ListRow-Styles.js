import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Row: {
    flexDirection: "row",
    backgroundColor: "#e2e2e2a9",
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
    height: 40,
    width: 40,
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
/* Row: {
  display: "grid",
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  background-color: #e2e2e2a9;
}
.Row:hover {
  background-color: #e2e2e249;
}
.Cell {
  display: flex;
  flex-direction: row;
  font-weight: 200;
  text-align: left;
  align-self: center;
  height: auto;
}
.Expanded {
  background-color: #e2e2e256;
}
.ExtraInformation {
  grid-area: 2/ 1/ 3/11;
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
}
#NameCell {
  grid-area: 1/ 1/ 1/5;
  font-size: 25px;
  font-weight: 400;
}
#AdressCell {
  grid-area: 1/ 5/ 1/8;
  font-weight: 400;
}
#SmileyCell {
  grid-area: 1/ 8/ 1/9;
  justify-content: center;
}
#ReviewCell {
  grid-area: 1/ 9/ 1/11;
  font-weight: 400;
  justify-content: flex-end;
}
.Text {
  align-self: center;
  margin: 0px;
}
#Address2Cell {
  grid-area: 1/5/1/8;
}
#GiveReviewCell {
  display: flex;
  grid-area: 1/8/1/11;
  justify-content: center;
}
#PostcodeCell {
  grid-area: 2/5/2/8;
}
#StarCell {
  display: flex;
  grid-area: 2/8/2/11;
  justify-content: center;
}
#TextCell {
  grid-area: 3/5/3/8;
  text-align: left;
  font-weight: 300;
}
#OldSmileys {
  grid-area: 4/5/4/8;
  justify-content: flex-start;
}
.Star {
  width: 30px;
  min-width: 25px;
  margin: 5px;
} */
