import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logo = require('../../assets/icon.png');

function TopNav(){
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.TopNav}>
                <Image source={logo} style={styles.logo} onProgress={()=> navigation.navigate("adminDash")} />
                <Text style={styles.TopNavText} onProgress={()=> navigation.navigate("adminDash")}>Android Voting System</Text>
                <Text style={styles.logout} onProgress={()=> navigation.navigate("home")}>Logout</Text>
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
        backgroundColor: "grey",
        flexDirection: "row",
        padding: 5,
        position: "relative"
    },
    TopNavText: {
        fontSize: 15,
        marginTop: 20
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
    logout: {
        justifyContent: "right",
        textAlign: "right",
        fontSize: 15,
        marginTop: 20,
        position: "absolute",
        right: "2%",
    },
})

export default TopNav;