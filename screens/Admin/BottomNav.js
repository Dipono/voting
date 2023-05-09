import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BottomNav() {
    const navigation = useNavigation()

    //report
    return (
        <View style={styles.container}>
            <View style={styles.bottomNav}>
                <Pressable style={styles.groupForm} onPress={() => navigation.navigate('admin')} >
                    <Text>Home</Text>
                </Pressable>
                <Pressable style={styles.groupForm} onPress={() => navigation.navigate('report')} >
                    <Text>Active Vote</Text>
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
    bottomNav: {
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        marginLeft:10,
        marginRight:10
    },
    bottomNavText: {
        fontSize: 15,
        marginTop: 20
    },
});


export default BottomNav;