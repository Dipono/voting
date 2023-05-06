import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BottomNav() {
    const navigation = useNavigation()

    //report
    return (
        <View style={styles.container}>
            <View style={styles.bottomNav}>
                <Pressable style={styles.groupForm} onPress={()=>navigation.navigate('adminDash')}>
                    <Text>Home</Text>
                </Pressable>
                <Pressable style={styles.groupForm} onPress={()=>navigation.navigate('adminDash')}>
                    <Text>Active Vote</Text>
                </Pressable>
                <Pressable style={styles.groupForm} onPress={()=>navigation.navigate('report')}>
                    <Text >Vote History</Text>
                </Pressable>
                {/* <View style={styles.groupForm}>
                    <Text>History</Text>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#FFFFFF",
    },
    bottomNav: {
        backgroundColor: "#9f97ab",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    bottomNavText: {
        fontSize: 15,
        marginTop: 20
    },
});


export default BottomNav;