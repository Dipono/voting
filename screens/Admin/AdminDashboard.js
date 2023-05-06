import { SafeAreaView, Animated, StyleSheet, Text, View, ScrollView, TextInput, Modal, TouchableOpacity, Pressable } from 'react-native';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { useState } from 'react';
import { Dimensions } from 'react-native';

function AdminDashboard() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [issue, setIssue] = useState('');

    let AnimatedHeaderValue = new Animated.Value(0);
    const Header_Max_Height = 100;
    const Header_Min_Height = 50;

    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp'
    })

    const [initialScreenSize, setinitialScreenSize] = useState(0);
    onContentSizeChange = (contentWidth, contentHeight) =>{
        setinitialScreenSize({initialScreenSize: contentHeight});
    }


    function add_new_isuue() {
        setShow(true);
    }
    const { height }  =  Dimensions.get('window')

    function publish_issue() {
        if (title == '' || issue == '') return alert("All field must be filled")
        alert("Issue published successfully")
        setShow(false);
    }
    const  scrollEnabled = initialScreenSize > height

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{ height: animatedHeaderHeight }]}>
                <TopNav />
            </Animated.View>

            <View style={styles.adminHome}>
                <View style={styles.homeHeader}>
                    {/* <Text style={styles.homeText}>Home</Text> */}
                    <View style={styles.AddNewIssue}>
                        {/* <TextInput style={styles.imputArea} /> */}
                        <TouchableOpacity style={styles.btnAdd} onPress={add_new_isuue}>
                            <Text style={styles.labelAdd}>Add New Issue or Argument</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView 
                    style={[styles.votes, styles.scrollview]}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={onContentSizeChange}
                >

                    <View style={styles.voteContent}>
                        <Text style={styles.voteTitle}>Title</Text>
                        <View style={styles.votingTime}>
                            <Text style={styles.timedate}>Open  : 2023/05/01 12:46</Text>
                            <Text style={styles.timedate}>close : 2023/05/01 14:46</Text>
                        </View>
                        <View style={styles.voteDesc}>
                            <Text style={styles.vodeDescription}>
                                The software process of developing and maintaining a
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
                                major area in the high-tech industry.
                            </Text>
                        </View>
                        <View style={styles.score}>
                            <Text style={styles.voteScoreLabel}>Agree:
                                <Text style={styles.voteScore}>12</Text>
                            </Text>
                            <Text style={styles.voteScoreLabel}>Disagree:
                                <Text style={styles.voteScore}>15</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.voteContent}>
                        <Text style={styles.voteTitle}>Title</Text>
                        <View style={styles.votingTime}>
                            <Text style={styles.timedate}>Open &ensp; : 2023/05/01 12:46</Text>
                            <Text style={styles.timedate}>Close &ensp; : 2023/05/01 14:46</Text>
                        </View>
                        <View style={styles.voteDesc}>
                            <Text style={styles.vodeDescription}>
                                The software process of developing and maintaining a
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
                                major area in the high-tech industry.
                            </Text>
                        </View>
                        <View style={styles.score}>
                            <Text style={styles.voteScoreLabel}>Agree:
                                <Text style={styles.voteScore}>12</Text>
                            </Text>
                            <Text style={styles.voteScoreLabel}>Disagree:
                                <Text style={styles.voteScore}>15</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <BottomNav />

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
                                        <Text style={styles.form_label}>Tittle</Text>
                                        <TextInput onChangeText={(event) => setTitle(event)}
                                            style={styles.form_control} />
                                    </View>
                                    <View style={styles.groupform}>
                                        <Text style={styles.form_label}>Issue</Text>
                                        <TextInput multiline={true}
                                            numberOfLines={15}
                                            onChangeText={(event) => setIssue(event)}
                                            style={styles.form_control} />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#FFFFFF",
        marginTop: 5
    },

    votes: {
        margin: 25,
        flex: 1
    },
    voteContent: {
        marginTop: 15,
        marginBottom: 10,
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
    scrollview: {
        // 
    }

});

export default AdminDashboard;