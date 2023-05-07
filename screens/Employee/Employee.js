
import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView } from 'react-native';
import Bottomnav from './BottomNav';
import TopNav from './TopNav';
import { useEffect, useState } from 'react';
export default function Employee() {
    const votes = [{
        id: 1, startDate: "2023/05/04 12:00", closeDate: "2023/05/04 15:00", vote: [{ yes: "Yes", no: "No" }], isuue: "To address issues that do not require attention, run:", title: "title"
    },
    {
        id: 2, startDate: "2023/05/03 12:00", closeDate: "2023/05/03 15:00", vote: "", isuue: "To address issues that do not require To address issues that do not require attention, run:", title: "title"
    }, {
        id: 3, startDate: "2023/05/04 12:00", closeDate: "2023/05/04 15:00", vote: [{ yes: "Yes", no: "No" }], isuue: "To address issues that do not require attention, run:", title: "title"
    },
    {
        id: 4, startDate: "2023/05/03 12:00", closeDate: "2023/05/03 15:00", vote: "", isuue: "To address issues that do not require To address issues that do not require attention, run:", title: "title"
    }, {
        id: 5, startDate: "2023/05/04 12:00", closeDate: "2023/05/04 15:00", vote: [{ yes: "Yes", no: "No" }], isuue: "To address issues that do not require attention, run:", title: "title"
    },
    {
        id: 6, startDate: "2023/05/03 12:00", closeDate: "2023/05/03 15:00", vote: "", isuue: "To address issues that do not require To address issues that do not require attention, run:", title: "title"
    }]

    

    const [show, setShow] = useState(false)
    const [TempIssues,setTempIssues] = useState([])
    const [TempVotes,setTempVotes] = useState([])


    useEffect(()=>{
        empId = 4;
        axios.get("https://localhost:7119/api/AndroidVoting/LatestIssues").then((response)=>{
            setTempIssues(response.data)
        })
        axios.get("https://localhost:7119/api/AndroidVoting/TotalVotes").then((response)=>{
            setTempVotes(response.data)
        })

        

    })
    function selectToVote(data) {
        //setShow(true)
        alert("Thanks For Voting")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TopNav />
            </View>
            <ScrollView style={styles.body}>
                {votes.map((vot, xId) => (
                    <View key={xId} style={styles.votesDesc}>
                        <Text style={styles.voteType}>{vot.title}</Text>
                        <Text style={styles.voteIssue}>{vot.isuue}</Text>
                        <View style={styles.voteTime}>
                            <Text style={styles.voteTimeLabel}>{vot.startDate} </Text>
                            <Text>To</Text>
                            <Text style={styles.voteTimeLabel}> {vot.closeDate}</Text>
                        </View>
                        <View style={styles.vote}>
                            <Pressable style={styles.voteYes} onPress={() => selectToVote('Yes')} >
                                <Text style={styles.voteTextLabel}>Yes</Text>
                            </Pressable>
                            <Pressable style={styles.voteNo} onPress={() => selectToVote('No')} >
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
        flex: 1
    },
    footer: {
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    bottomNavText: {
        fontSize: 15,
        marginTop: 20
    },
    body: {
        flex: 1
    },
    votesDesc: {
        margin: 10,
        backgroundColor: "#A9A9A9",
        borderRadius: 5,
        padding: 5
    },
    voteType: {
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    },
    voteIssue: {
        marginTop: 5
    },
    voteTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    voteTimeLabel: {
        fontSize: 15
    },
    voteYes: {
        backgroundColor: "#66FF99",
        height: 40,
        width: "45%",
        borderRadius: 5
    },
    voteNo: {
        backgroundColor: "#FF6699",
        textAlign: "center",
        height: 40,
        width: "45%",
        borderRadius: 5
    },
    vote: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 5,
        marginRight: 5
    },
    voteTextLabel: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 20,
        fontWeight: "600"
    },
    modal: {
        flex: 1,
        backgroundColor: "#F5FFFA",
    },
    inner_modal:{
        backgroundColor:"#708090"
    }
});
