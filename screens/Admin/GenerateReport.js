import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Modal,
} from "react-native";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import axios from "axios";

let issue = [
  {
    id: 1,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/05/01 12:00",
    agree: 75,
    disagree: 5,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 2,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/01 10:00",
    agree: 50,
    disagree: 20,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 3,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/16 12:00",
    agree: 20,
    disagree: 50,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 4,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/16 12:00",
    agree: 25,
    disagree: 45,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 5,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/20 11:00",
    agree: 55,
    disagree: 15,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 6,
    title: "Title ",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/23 12:00",
    agree: 60,
    disagree: 10,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 7,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/04/28 09:00",
    agree: 30,
    disagree: 40,
    IssueDesc: "",
  },
  {
    id: 8,
    title: "Title",
    startTime: "2023/04/30",
    agree: 40,
    disagree: 30,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 9,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/05/01 08:12",
    agree: 40,
    disagree: 30,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
  {
    id: 10,
    title: "Title",
    closeTime: "2023/05/01 13:00",
    startTime: "2023/05/02 12:00",
    agree: 20,
    disagree: 50,
    IssueDesc: `The software process of developing and maintaining a
product or a service plays a crucial role in determining the quality
level of the product or service but also the cost of developing,
supporting and maintaining it.
Process has been recognized important for decades in manufacturing,
but it became, more lately, a priority in software
production and high-tech service provisioning. In fact, software
producers and telecommunications service providers,
from small vendors to giants like Microsoft and AT&T, have
started to model, analyse, and re-engineer or improve the processes
used to produce, support and maintain their products and
services. Process improvement has finally been identified as a
major area in the high-tech industry.`,
  },
];

function GenerateReport() {
  const [TempIssues, setTempIssues] = useState([]);
  const [TempVotes, setTempVotes] = useState([]);
  const [AllIssues, setAllIssues] = useState([]);

  useEffect(() => {
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
    let agreeResults;
    let disagreeResults;
    for (var issueIndex = 0; issueIndex < TempIssues.length; issueIndex++) {
      var isFound = false;
      agreeResults = 0;
      disagreeResults = 0;
      for (var voteIndex = 0; voteIndex < TempVotes.length; voteIndex++) {
        if (TempVotes[voteIndex].issueId === TempIssues[issueIndex].id) {
          if (TempVotes[voteIndex].agreed === true) {
            agreeResults = agreeResults + 1;
          } else {
            disagreeResults = disagreeResults + 1;
          }
          isFound = true;
        }
        
         
        }
        if (isFound === true) {
        objResults = {
            startDate: TempIssues[issueIndex].startTime,
            endDate: TempIssues[issueIndex].endTime,
            issueDesc: TempIssues[issueIndex].issueDesc,
            agreeResults: agreeResults,
            disagreeResults: disagreeResults,
          };
          arrResults.push(objResults);
      }
      setAllIssues(arrResults);
    }
  });

  const [ShowReport, setShowReport] = useState(false);
  const [Results, setResults] = useState({});
  function view_report(report) {
    setResults(report);
    setShowReport(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopNav />
      </View>
      <ScrollView style={styles.body}>
        {AllIssues.map((iss, xid) => (
          <View key={xid} style={styles.issuesList}>
            <Text style={styles.issuesListDate}>
              {iss.issueDesc.substr(0, 100)}...
            </Text>
            <Text
              style={styles.issuesListView}
              onPress={() => view_report(iss)}
            >
              View
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <BottomNav />
      </View>

      <Modal transparent={true} visible={ShowReport}>
        <View style={styles.modal}>
          <View style={styles.inner_modal}>
            <View style={styles.modal_header}>
              <Pressable onPress={() => setShowReport(false)}>
                <Text>X</Text>
              </Pressable>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.add_label}>Report</Text>
              <ScrollView style={styles.modal_form}>
                <View style={styles.groupform}>
                </View>
                <View style={styles.groupform}>
                  <Text style={styles.form_label}>Start Time</Text>
                  <Text>{Results.startDate}</Text>
                </View>
                <View style={styles.groupform}>
                  <Text style={styles.form_label}>End Time</Text>
                  <Text>{Results.endDate}</Text>
                </View>
                <View style={styles.groupform}>
                  <Text style={styles.form_label}>Results</Text>
                  <View style={styles.score}>
                    <Text> Agreed : {Results.agreeResults}</Text>
                    <Text> Disagree : {Results.disagreeResults}</Text>
                  </View>
                </View>
                <View style={styles.groupform}>
                  <Text style={styles.form_label}>Issue</Text>
                  <Text>{Results.issueDesc}</Text>
                </View>

                <View style={styles.groupform}>
                  <Pressable
                    style={styles.publish_btn}
                    onPress={() => setShowReport(false)}
                  >
                    <Text style={styles.publish_label}>Close</Text>
                  </Pressable>
                </View>
              </ScrollView>
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
  header: {
    paddingTop: 5,
  },
  body: {
    flex: 1,
  },
  issuesList: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginTop: 5,
  },

  issuesListDate: {
    width: "80%",
  },
  issuesListView: {
    width: "20%",
    color: "green",
  },
  modal: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  inner_modal: {
    backgroundColor: "white",
    flex: 1,
    margin: 20,
    padding: 5,
  },
  modal_header: {
    textAlign: "right",
    marginRight: 2,
  },
  modal_form: {
    flex: 1,
  },
  add_label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modal_form: {
    marginTop: 10,
  },
  form_control: {
    borderColor: "#858585",
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  form_label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  groupform: {
    marginTop: 10,
  },
  publish_btn: {
    backgroundColor: "#858585",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  publish_label: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default GenerateReport;
