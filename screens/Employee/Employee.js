import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import Bottomnav from "./BottomNav";
import TopNav from "./TopNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Employee() {
  const [show, setShow] = useState(false);
  const [TempIssues, setTempIssues] = useState([]);
  const [TempVotes, setTempVotes] = useState([]);
  const [Votes, setVotes] = useState([]);
  const [EmpId, seEmpId] = useState(0);

  useEffect(() => {
    seEmpId(Number(localStorage.getItem("user")));
    var newObj = {
      EmpId: EmpId,
    };
    axios
      .get("https://localhost:7119/api/AndroidVoting/LatestIssues")
      .then((response) => {
        setTempIssues(response.data);
      }) /
      axios
        .get("https://localhost:7119/api/AndroidVoting/TotalVotes")
        .then((response) => {
          setTempVotes(response.data);
        });

    var tempIssueObj = {};
    var tempIssueArr = [];
    for (var indexIssue = 0; indexIssue < TempIssues.length; indexIssue++) {
      var isFound = false;
      for (var indexVote = 0; indexVote < TempVotes.length; indexVote++) {
        var openTime = new Date(TempIssues[indexIssue].startTime);
        var closeTime = new Date(TempIssues[indexIssue].endTime);
        var currentDate = new Date();
         
        if (
          TempIssues[indexIssue].id === TempVotes[indexVote].issueId &&
          EmpId === TempVotes[indexVote].empId
        ) {
          isFound = true;
        }
      }
      if (openTime < currentDate && closeTime > currentDate) {
        if (isFound === false) {
          tempIssueObj = {
            id: TempIssues[indexIssue].id,
            startTime: TempIssues[indexIssue].startTime,
            endTime: TempIssues[indexIssue].endTime,
            issueDesc: TempIssues[indexIssue].issueDesc,
          };
          tempIssueArr.push(tempIssueObj);
        }
      }
    }

    setVotes(tempIssueArr);
  });
  function selectToVote(agreed, issueId) {
    var data = {
      issueId: issueId,
      empId: EmpId,
      agreed: agreed,
    };
    console.log(data);
    axios
      .post("https://localhost:7119/api/AndroidVoting/EmployeeVote", data)
      .then((response) => {
        console.log(response);
        alert("Thanks For Voting " + data);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopNav />
      </View>
      <ScrollView style={styles.body}>
        {Votes.map((vot, xId) => (
          <View key={xId} style={styles.votesDesc}>
            <Text style={styles.voteTimeLabel}>{vot.startTime} </Text>
            <Text style={styles.voteTimeLabel}>{vot.endTime}</Text>
            <Text style={styles.voteIssue}>{vot.issueDesc}</Text>
            <View style={styles.vote}>
              <Pressable
                style={styles.voteYes}
                onPress={() => selectToVote(true, vot.id)}
              >
                <Text style={styles.voteTextLabel}>Yes</Text>
              </Pressable>
              <Pressable
                style={styles.voteNo}
                onPress={() => selectToVote(false, vot.id)}
              >
                <Text style={styles.voteTextLabel}>No</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Bottomnav />
      </View>

      <Modal transparent={true} visible={show}>
        <View style={styles.modal}>
          <View style={styles.inner_modal}>
            <View style={styles.inner_header}>
              <Text>Thank For Voting</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#FFFFFF",
    marginTop: 50,
    flex: 1,
  },
  footer: {
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  bottomNavText: {
    fontSize: 15,
    marginTop: 20,
  },
  body: {
    flex: 1,
  },
  votesDesc: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#A9A9A9",
    borderRadius: 5,
    padding: 5,
  },
  voteType: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  voteIssue: {
    marginTop: 5,
  },
  voteTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  voteTimeLabel: {
    fontWeight: "400",
  },
  voteYes: {
    backgroundColor: "#66FF99",
    height: 35,
    width: "35%",
    borderRadius: 5,
  },
  voteNo: {
    backgroundColor: "#FF6699",
    height: 35,
    width: "35%",
    borderRadius: 5,
  },
  vote: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  voteTextLabel: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 20,
    fontWeight: "600",
  },
  modal: {
    flex: 1,
    backgroundColor: "#F5FFFA",
  },
  inner_modal: {
    backgroundColor: "#708090",
  },
});
