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

function ActiveVote() {
  const issues = [
    {
      id: 1,
      startDate: "2023/05/04 12:00",
      endDate: "2023/05/04 15:00",
      issue: "To address issues that do not require attention, run:",
    },
    {
      id: 2,
      startDate: "2023/05/03 12:00",
      endDate: "2023/05/03 15:00",
      issue:
        "To address issues that do not require To address issues that do not require attention, run:",
    },
    {
      id: 3,
      startDate: "2023/05/04 12:00",
      endDate: "2023/05/04 15:00",
      issue: "To address issues that do not require attention, run:",
    },
    {
      id: 4,
      startDate: "2023/05/03 12:00",
      endDate: "2023/05/03 15:00",
      issue:
        "To address issues that do not require To address issues that do not require attention, run:",
    },
    {
      id: 5,
      startDate: "2023/05/04 12:00",
      endDate: "2023/05/04 15:00",
      issue: "To address issues that do not require attention, run:",
    },
    {
      id: 6,
      startDate: "2023/05/03 12:00",
      endDate: "2023/05/03 15:00",
      issue:
        "To address issues that do not require To address issues that do not require attention, run:",
    },
  ];

  const votes = [
    { id: 1, issueId: 1, agreed: true, empId: 4 },
    { id: 2, issueId: 4, agreed: true, empId: 3 },
  ];

  const [show, setShow] = useState(false);
  const [TempIssues, setTempIssues] = useState([]);
  const [TempVotes, setTempVotes] = useState([]);
  const [ActiveIssues, setActiveIssues] = useState([]);
  const [EmpId, seEmpId] = useState(0);

  useEffect(() => {
    seEmpId(Number(localStorage.getItem("user")));
    axios
      .get("https://localhost:7119/api/AndroidVoting/LatestIssues")
      .then((response) => {
        setTempIssues(response.data);
      });
    axios
      .get("https://localhost:7119/api/AndroidVoting/TotalVotes")
      .then((response) => {
        setTempVotes(response.data);
      });
    let objResults = {};
    let arrResults = [];
    for (var issueIndex = 0; issueIndex < TempIssues.length; issueIndex++) {
      for (var voteIndex = 0; voteIndex < TempVotes.length; voteIndex++) {
        if (
          TempVotes[voteIndex].issueId === TempIssues[issueIndex].id &&
          TempVotes[voteIndex].empId === EmpId
        ) {
          var openTime = new Date(TempIssues[issueIndex].startTime);
          var closeTime = new Date(TempIssues[issueIndex].endTime);
          var currentDate = new Date();
          if (openTime < currentDate && closeTime > currentDate) {
            objResults = {
              startDate: TempIssues[issueIndex].startTime,
              endDate: TempIssues[issueIndex].endTime,
              issueDesc: TempIssues[issueIndex].issueDesc,
            };
            arrResults.push(objResults);
          }
        }
      }
    }
    setActiveIssues(arrResults);
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopNav />
      </View>
      <ScrollView style={styles.body}>
        {ActiveIssues.map((vot, xId) => (
          <View key={xId} style={styles.votesDesc}>
            <Text style={styles.voteIssue}>{vot.issueDesc}</Text>
            <View style={styles.time}>
              <Text style={styles.voteTimeLabel}>Open Until {vot.endDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Bottomnav />
      </View>
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
  body: {
    flex: 1,
    marginTop: 5,
  },
  votesDesc: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#A9A9A9",
    borderRadius: 5,
    padding: 5,
  },
  time: {
    marginTop: 5,
  },
});

export default ActiveVote;
