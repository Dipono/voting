import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

function AdminDashboard() {

    return (
        <View style={styles.container}>
            <TopNav />
            <View style={styles.adminHome}>
                <View style={styles.homeHeader}>
                    <Text style={styles.homeText}>Home</Text>
                    <View style={styles.AddNewIssue}>
                        {/* <TextInput style={styles.imputArea} /> */}
                        <TouchableOpacity style={styles.btnAdd}>
                            <Text style={styles.labelAdd}>Add New Issue or Argument</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.votes}>
                    <View style={styles.voteContent}>
                        <View style={styles.votingTime}>
                            <Text style={styles.timedate}>Open  : 2023/05/01 12:46</Text>
                            <Text style={styles.timedate}>close : 2023/05/01 14:46</Text>
                        </View>
                        <View style={styles.voteDesc}>
                            <Text style={styles.voteTitle}>Title</Text>
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
                        <View >style={styles.score}
                            <Text style={styles.voteScoreLabel}>Agree:
                                <Text style={styles.voteScore}>12</Text>
                            </Text>
                            <Text style={styles.voteScoreLabel}>Disagree:
                                <Text style={styles.voteScore}>15</Text>
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      color: "#FFFFFF",
      width: "100%",
      margin: 10
    },
    homeText: {
      textAlign: "center",
      fontSize: "20",
      fontWeight: "bold"
    },
    /*imputArea:{
      borderColor:"black",
      borderWidth:2,
      margin:12,
      height:100
    }*/
    AddNewIssue: {
      marginTop: 25
    },
  
    btnAdd: {
      backgroundColor: "grey",
      marginTop: 5,
      marginLeft:50,
      marginRight:50,
      borderRadius: 5
    },
    labelAdd: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "500"
    }
  
  });

export default AdminDashboard;