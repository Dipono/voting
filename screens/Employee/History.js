import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView } from 'react-native';
import Bottomnav from './BottomNav';
import TopNav from './TopNav';
import { useEffect, useState } from 'react';

function History() {

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

    const [show, setShow] = useState(false)
    const [TempIssues, setTempIssues] = useState([])
    const [TempVotes, setTempVotes] = useState([])
    const [Results, setResults] = useState([])

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
        setResults(arrResults)
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TopNav />
            </View>
            <ScrollView style={styles.body}>
                {Results.map((result, xId) => (
                    <View style={styles.voteContent} key={xId}>
                        <View style={styles.votingTime}>
                            <Text style={styles.timedate}>Open  : {result.startDate}</Text>
                            <Text style={styles.timedate}>close : {result.endDate}</Text>
                        </View>
                        <View style={styles.voteDesc}>
                            <Text style={styles.vodeDescription}>
                                {result.issue}
                            </Text>
                        </View>
                        <View style={styles.score}>
                            <Text style={styles.voteScoreLabel}>Agree:
                                <Text style={styles.voteScore}>{result.agreeResults}</Text>
                            </Text>
                            <Text style={styles.voteScoreLabel}>Disagree:
                                <Text style={styles.voteScore}>{result.disagreeResults}</Text>
                            </Text>
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
        flex: 1
    },
    footer: {
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    body: {
        flex: 1
    },
    voteContent: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: "#C5C6C3",
        padding: 5,
        borderRadius: 5
    },
    voteDesc: {
        marginTop: 10
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

});

export default History;