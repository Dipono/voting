import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
function AdminDashboard() {
  let Time = ["00:00","01:00","02:00","03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "2:00",
    "23:00",
  ];
  const [show, setShow] = useState(false);
  const [OpenStartCalender, setOpenStartCalender] = useState(false);
  const [OpenEndCalender, setOpenEndCalender] = useState(false);
  const [TempIssues, setTempIssues] = useState([]);
  const [TempVotes, setTempVotes] = useState([]);
  const [ActiveIssues, setActiveIssues] = useState([]);
  const [Issue, setIssue] = useState("");
  const [InitialDate, setInitialDate] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [selectedStartDate, setSelectedStartDate]= useState("Select Start date")
  const [selectedEndDate, setSelectedEndDate]= useState("Select End date")


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
      agreeResults = 0;
      disagreeResults = 0;
      for (var voteIndex = 0; voteIndex < TempVotes.length; voteIndex++) {
        if (TempVotes[voteIndex].issueId === TempIssues[issueIndex].id) {
          if (TempVotes[voteIndex].agreed === true) {
            agreeResults = agreeResults + 1;
          } else {
            disagreeResults = disagreeResults + 1;
          }
        }
      }
      var openTime = new Date(TempIssues[issueIndex].startTime);
      var closeTime = new Date(TempIssues[issueIndex].endTime);
      var currentDate = new Date();
      if (openTime < currentDate && closeTime > currentDate) {
        objResults = {
          startDate: TempIssues[issueIndex].startTime,
          endDate: TempIssues[issueIndex].endTime,
          issueDesc: TempIssues[issueIndex].issueDesc,
          agreeResults: agreeResults,
          disagreeResults: disagreeResults,
        };
        arrResults.push(objResults);
      }
    }
    setActiveIssues(arrResults);
    var date = new Date();
    var getYear = date.getFullYear();
    var getMonth = date.getMonth() + 1;
    var getDate = date.getDate();
    setInitialDate(getYear + "-" + getMonth + "-" + getDate);
  });

  function add_new_isuue() {
    setShow(true);
  }

  function startDate(date) {
    setStartDate(date.dateString);
    setSelectedStartDate(date.dateString)
    setOpenStartCalender(false);
  }

  function closeDate(date) {
    setEndDate(date.dateString);
    setSelectedEndDate(date.dateString)
    setOpenEndCalender(false);
  }

  function startTime(time) {
    console.log(time);
    setStartTime(time);
  }

  function endTime(time) {
    setEndTime(time);
    console.log(time);
  }

  async function publish_issue() {
    if (Issue === "") return alert("Issue field must be filled");
    if (
      StartDate === "" ||
      StartTime === "" ||
      EndDate === "" ||
      EndTime === ""
    )
      return alert("All Date and Time must be selecetd");

    var data = {
      IssueDesc: Issue,
      StartTime: StartDate + " " + StartTime,
      EndTime: EndDate + " " + EndTime,
    };
    console.log(data);
    var publish = await axios.post(
      "https://localhost:7119/api/AndroidVoting/Issue",
      data
    );

    console.log(publish);

    alert("Issue published successfully");
    setShow(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopNav />
      </View>

      <View style={styles.homeHeader}>
        {/* <Text style={styles.homeText}>Home</Text> */}
        <View style={styles.AddNewIssue}>
          {/* <TextInput style={styles.imputArea} /> */}
          <TouchableOpacity style={styles.btnAdd} onPress={add_new_isuue}>
            <Text style={styles.labelAdd}>Add New Issue or Argument</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        {ActiveIssues.map((active, xId) => (
          <View style={styles.voteContent} key={xId}>
            <View style={styles.votingTime}>
              <Text style={styles.timedate}>Open : {active.startDate}</Text>
              <Text style={styles.timedate}>close : {active.endDate}</Text>
            </View>
            <View style={styles.voteDesc}>
              <Text style={styles.vodeDescription}>{active.issueDesc}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.voteScoreLabel}>
                Agree:
                <Text style={styles.voteScore}> {active.agreeResults}</Text>
              </Text>
              <Text style={styles.voteScoreLabel}>
                Disagree:
                <Text style={styles.voteScore}> {active.disagreeResults}</Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <BottomNav />
      </View>

      <Modal transparent={true} visible={show}>
        <View style={styles.modal}>
          <View style={styles.inner_modal}>
            <View style={styles.modal_header}>
              <Pressable onPress={() => setShow(false)}>
                <Text>X</Text>
              </Pressable>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.add_label}>Add New Issue</Text>
              <View style={styles.modal_form}>
                <ScrollView style={styles.scrollview}>
                  <View style={styles.groupform}>
                    <Text style={styles.form_label}>Issue</Text>
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={(event) => setIssue(event)}
                      style={styles.form_control}
                    />
                  </View>
                  <View style={styles.groupform}>
                    <Text style={[styles.form_label, styles.datesAndTime]}>
                      Start Date And Time
                    </Text>
                    <View style={styles.dateTime}>
                      <View style={styles.date}>
                        <TouchableOpacity
                          onPress={() => setOpenStartCalender(true)}
                          style={styles.dateSelect}
                        >
                          <Text style={styles.dateText}>{selectedStartDate}</Text>
                        </TouchableOpacity>
                        <View style={styles.formGroup}>
                          {/* <Text style={styles.formTimeText}>Time</Text> */}
                          <SelectDropdown
                            data={Time}
                            onSelect={(selectedTime) => {
                              startTime(selectedTime);
                            }}
                            buttonStyle={styles.dropBtnStyles}
                            defaultButtonText="Select Start Time"
                            buttonTextStyle={styles.dropBtnTextStyle}
                          />
                        </View>
                      </View>
                      <View style={styles.time}></View>
                    </View>
                    <Text style={[styles.form_label, styles.datesAndTime]}>
                      End Date And Time
                    </Text>
                    <View style={styles.dateTime}>
                      <View style={styles.date}>
                        <TouchableOpacity
                          onPress={() => setOpenEndCalender(true)}
                          style={styles.dateSelect}
                        >
                          <Text style={styles.dateText}>{selectedEndDate}</Text>
                        </TouchableOpacity>
                        <View style={styles.formGroup}>
                          {/* <Text style={styles.formTimeText}>Time</Text> */}
                          <SelectDropdown
                            data={Time}
                            onSelect={(selectedTime) => {
                              endTime(selectedTime);
                            }}
                            buttonStyle={styles.dropBtnStyles}
                            defaultButtonText="Select End Time"
                            buttonTextStyle={styles.dropBtnTextStyle}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.groupform}>
                  <Pressable onPress={publish_issue} style={styles.publish_btn}>
                    <Text style={styles.publish_label}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={OpenStartCalender}
        animationType="fade"
      >
        <Calendar
          style={styles.calender}
          onDayPress={(date) => {
            startDate(date);
          }}
          initialDate={InitialDate}
          minDate={InitialDate}
        />
      </Modal>
      <Modal transparent={true} visible={OpenEndCalender} animationType="fade">
        <Calendar
          style={styles.calender}
          onDayPress={(date) => {
            closeDate(date);
          }}
          initialDate={InitialDate}
          minDate={InitialDate}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  calender: {
    margin: 100,
    borderRadius: 10,
    elevation: 4,
  },
  dateSelect: {
    borderWidth: 2,
    borderRadius: 5,
    width: 150,
    paddingTop: 7,
    paddingBottom: 7,
  },
  dateText: {
    marginTop: -10,
  },

  dropBtnStyles: {
    width: 150,
    height: 20,
    marginLeft: 5,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
  },
  dropBtnTextStyle: {
    fontSize: 15,
    textAlign: "left",
  },
  dropDownStyle: {
    textAlign: "left",
  },

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

  votes: {
    margin: 25,
    flex: 1,
  },
  voteContent: {
    marginTop: 5,
    backgroundColor: "#C5C6C3",
    padding: 5,
    borderRadius: 5,
  },
  voteTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  AddNewIssue: {
    marginTop: 5,
  },
  voteDesc: {
    marginTop: 10,
  },
  btnAdd: {
    backgroundColor: "#858585",
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
  },
  score: {
    marginTop: 5,
    borderTopColor: "black",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  voteScore: {
    textAlign: "center",
  },
  labelAdd: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  modal: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  inner_modal: {
    backgroundColor: "#ffffff",
    flex: 1,
    margin: 20,
    padding: 5,
  },
  modal_header: {
    textAlign: "right",
    marginRight: 2,
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
    textAlignVertical: "top",
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 5,
    fontSize: 15,
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
  dateTime: {
    flexDirection: "row",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    width: 50,
    height: 20,
    textAlign: "center",
  },
  time: {
    flexDirection: "row",
  },
  dateGroup: {
    width: 50,
    marginLeft: 5,
  },
  timeGroup: {
    width: 50,
    marginLeft: 5,
  },
  dateInput: {
    width: 50,
    borderColor: "#858585",
    borderWidth: 2,
  },
  timeInput: {
    width: 50,
    borderColor: "#858585",
    borderWidth: 2,
  },
  datesAndTime: {
    marginTop: 15,
  },
});

export default AdminDashboard;
