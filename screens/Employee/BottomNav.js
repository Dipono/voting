
import { StyleSheet, Text, View, Image } from 'react-native';

export default function bottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        <View style={styles.groupForm}>
          <Text>Home</Text>
        </View>
        <View style={styles.groupForm}>
          <Text>Active Vote</Text>
        </View>
        <View style={styles.groupForm}>
          <Text>History</Text>
        </View>
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
    flexDirection:"row",
    justifyContent:"space-between",
    padding:5,
  },
  bottomNavText: {
    fontSize: 15,
    marginTop:20
  },
});
