import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
const logo = require('../../assets/icon.png');
export default function TopNav() {
    return (
        <View style={styles.container}>
            <View style={styles.TopNav}>
                <Pressable style={styles.leftTop} onProgress={() => navigation.navigate("employee")} >
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.TopNavText}>Android Voting System</Text>
                </Pressable>
                <Pressable  style={styles.rightTop} onProgress={() => navigation.navigate("home")} >
                    <Text style={styles.logout}>Logout</Text>
                </Pressable>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#FFFFFF",
        width: "100%"
    },
    TopNav: {
        backgroundColor: "#808080",
        flexDirection: "row",
        padding: 5,
        position: "relative"
    },
    TopNavText: {
        fontSize: 15,
        marginTop: 20
    },
    leftTop:{
        flexDirection: "row",

    },
    inputFields: {
        marginBottom: 20
    },
    logo: {
        width: 50,
        height: 50,
        margin: 2,
        borderRadius: 100
    },
    rightTop:{
        marginTop: 20,
        position: "absolute",
        right: "2%",
    },
    logout: {
        fontSize: 15,
        
    },
})