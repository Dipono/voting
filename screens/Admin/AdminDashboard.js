import { StyleSheet, Text, View, TouchableOpacity, Pressable, Modal, ScrollView, TextInput } from 'react-native';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { useEffect, useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
//import axios from 'axios';
import { DateTimePicker } from '@react-native-community/datetimepicker';
function AdminDashboard() {
    const issues = [{
        id: 1, startDate: "2023/05/04 12:00", endDate: "2023/05/04 15:00", issue: "To address issues that do not require attention, run:"
    },
    {
        id: 2, startDate: "2023/05/03 12:00", endDate: "2023/05/03 15:00", issue: "To address issues that do not require To address issues that do not require attention, run:"
    }, {
        id: 3, startDate: "2023/05/04 12:00", endDate: "2023/05/04 15:00", issue: "To address issues that do not require attention, run:"
    },
    {
        id: 4, startDate: "2023/05/03 12:00", endDate: "2023/05/03 15:00", issue: "To address issues that do not require To address issues that do not require attention, run:"
    }, {
        id: 5, startDate: "2023/05/04 12:00", endDate: "2023/05/04 15:00", issue: "To address issues that do not require attention, run:"
    },
    {
        id: 6, startDate: "2023/05/03 12:00", endDate: "2023/05/03 15:00", issue: "To address issues that do not require To address issues that do not require attention, run:"
    }]

    const votes = [
        { id: 1, issueId: 1, agreed: true },
        { id: 2, issueId: 4, agreed: true },
    ]

    const [show, setShow] = useState(true)
    const [TempIssues, setTempIssues] = useState([])
    const [TempVotes, setTempVotes] = useState([])
    const [ActiveIssues, setActiveIssues] = useState([])
    const [Issue, setIssue] = useState('')
    const [StartYear, setStartYear] = useState('');
    const [StartMonth, setStartMonth] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [StartHour, setStartHour] = useState('');
    const [StartMinute, setStartMinute] = useState('');
    const [EndYear, setEndYear] = useState('');
    const [EndMonth, setEndMonth] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [EndHour, setEndHour] = useState('');
    const [EndMinute, setEndMinute] = useState('');

    useEffect(() => {
        // axios.get("https://localhost:7119/api/AndroidVoting/LatestIssues").then((response)=>{
        //     setTempIssues(response.data)
        // })
        // axios.get("https://localhost:7119/api/AndroidVoting/TotalVotes").then((response)=>{
        //     setTempVotes(response.data)
        // })
        setTempIssues(issues)
        setTempVotes(votes)
        let objResults = {}
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
                    }
                    else {
                        disagreeResults = disagreeResults + 1;
                    }
                }
            }
            objResults = {
                startDate: TempIssues[issueIndex].startDate,
                endDate: TempIssues[issueIndex].endDate,
                issue: TempIssues[issueIndex].issue,
                agreeResults: agreeResults,
                disagreeResults: disagreeResults
            }
            arrResults.push(objResults);
        }
        setActiveIssues(arrResults)
    })

    function add_new_isuue() {
        setShow(true);
    }

    function publish_issue() {
        console.log(isNaN(StartYear))
        if (Issue === '' || StartDate === '' || StartYear === '' || StartMonth === '' || StartHour === '' ||
        StartMinute === '' || EndYear === '' || EndMonth ==='' || EndDate==='' || EndHour==='' || EndMinute==='') return alert("All field must be filled")
        
        if(StartYear.length !== 4 || EndYear.length !== 4) return alert("Invalid Year, it has to be four numbers");
        if(StartMonth.length !==1 || StartMonth.length !== 2 || EndMonth.length !==1 || EndMonth.length !== 2 || 
            StartMonth === '0' || EndMonth === '0' || Number(StartMonth) > 12 || Number(EndMonth) > 12) 
            return alert("Enter correct month number")
        alert("Issue published successfully")
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
<DateTimePicker />
            <ScrollView style={styles.body}>
                {ActiveIssues.map((active, xId) => (
                    <View style={styles.voteContent} key={xId}>
                        <View style={styles.votingTime}>
                            <Text style={styles.timedate}>Open  : {active.startDate}</Text>
                            <Text style={styles.timedate}>close : {active.endDate}</Text>
                        </View>
                        <View style={styles.voteDesc}>
                            <Text style={styles.vodeDescription}>
                                {active.issue}
                            </Text>
                        </View>
                        <View style={styles.score}>
                            <Text style={styles.voteScoreLabel}>Agree:
                                <Text style={styles.voteScore}>{active.agreeResults}</Text>
                            </Text>
                            <Text style={styles.voteScoreLabel}>Disagree:
                                <Text style={styles.voteScore}>{active.disagreeResults}</Text>
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
                                        <TextInput multiline={true}
                                            numberOfLines={5}
                                            onChangeText={(event) => setIssue(event)}
                                            style={styles.form_control} />
                                    </View>
                                    <View style={styles.groupform}>
                                        <Text style={[styles.form_label, styles.datesAndTime]}>Start Date And Time</Text>
                                        <View style={styles.dateTime}>
                                            <View style={styles.date}>
                                                <View style={styles.dateGroup}>
                                                    <Text>Year</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setStartYear(event)} />
                                                </View>
                                                <View style={styles.dateGroup}>
                                                    <Text>Month</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setStartMonth(event)} />
                                                </View>
                                                <View style={styles.dateGroup}>
                                                    <Text>Date</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setStartDate(event)} />
                                                </View>
                                            </View>
                                            <View style={styles.time}>
                                                <View style={styles.timeGroup}>
                                                    <Text>Hour</Text>
                                                    <TextInput style={styles.timeInput} onChangeText={(event) => setStartHour(event)} />
                                                </View>
                                                <View style={styles.timeGroup}>
                                                    <Text>Minutes</Text>
                                                    <TextInput style={styles.timeInput} onChangeText={(event) => setStartMinute(event)} />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={[styles.form_label, styles.datesAndTime]}>End Date And Time</Text>
                                        <View style={styles.dateTime}>
                                            <View style={styles.date}>
                                                <View style={styles.dateGroup}>
                                                    <Text>Year</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setEndYear(event)} />
                                                </View>
                                                <View style={styles.dateGroup}>
                                                    <Text>Month</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setEndMonth(event)} />
                                                </View>
                                                <View style={styles.dateGroup}>
                                                    <Text>Date</Text>
                                                    <TextInput style={styles.dateInput} onChangeText={(event) => setEndDate(event)} />
                                                </View>
                                            </View>
                                            <View style={styles.time}>
                                                <View style={styles.timeGroup}>
                                                    <Text>Hour</Text>
                                                    <TextInput style={styles.timeInput} onChangeText={(event) => setEndHour(event)} />
                                                </View>
                                                <View style={styles.timeGroup}>
                                                    <Text>Minutes</Text>
                                                    <TextInput style={styles.timeInput} onChangeText={(event) => setEndMinute(event)} />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#FFFFFF",
        marginTop: 50,
        flex: 1
    },
    footer: {
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    header: {
        paddingTop: 5
    },
    body: {
        flex: 1
    },

    votes: {
        margin: 25,
        flex: 1
    },
    voteContent: {
        marginTop: 5,
        backgroundColor: "#C5C6C3",
        padding: 5,
        borderRadius: 5
    },
    voteTitle: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500"
    },
    AddNewIssue: {
        marginTop: 5
    },
    voteDesc: {
        marginTop: 10
    },
    btnAdd: {
        backgroundColor: "#858585",
        marginTop: 5,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 5
    },
    score: {
        marginTop: 5,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    voteScore: {
        textAlign: 'center',
    },
    labelAdd: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500"
    },
    modal: {
        backgroundColor: "#f5f5f5",
        flex: 1
    },
    inner_modal: {
        backgroundColor: "#ffffff",
        flex: 1,
        margin: 20,
        padding: 5
    },
    modal_header: {
        textAlign: "right",
        marginRight: 2
    },
    add_label: {
        marginTop: 5,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    modal_form: {
        marginTop: 10
    },
    form_control: {
        borderColor: "#858585",
        textAlignVertical: "top",
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        padding: 5,
        fontSize: 15
    },
    form_label: {
        fontSize: 15,
        fontWeight: "bold"
    },
    groupform: {
        marginTop: 10
    },
    publish_btn: {
        backgroundColor: "#858585",
        textAlign: "center",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    },
    publish_label: {
        fontSize: 15,
        fontWeight: "bold"
    },
    dateTime: {
        flexDirection: 'row',
    },
    date: {
        flexDirection: 'row',
    },
    time: {
        flexDirection: 'row',
    },
    dateGroup: {
        width: 50,
        marginLeft: 5
    },
    timeGroup: {
        width: 50,
        marginLeft: 5
    },
    dateInput: {
        width: 50,
        borderColor: "#858585",
        borderWidth: 2
    },
    timeInput: {
        width: 50,
        borderColor: "#858585",
        borderWidth: 2
    },
    datesAndTime: {
        marginTop: 15
    }

});

export default AdminDashboard;