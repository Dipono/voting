import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function bottomNav() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        <Pressable style={styles.groupForm} onPress={() =>navigation.navigate('employee')} >
          <Text>Home</Text>
        </Pressable>
        <Pressable style={styles.groupForm}  onPress={() =>navigation.navigate('active')} >
          <Text>Active Vote</Text>
        </Pressable>
        <Pressable style={styles.groupForm}  onPress={() =>navigation.navigate('results')} >
          <Text>History</Text>
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
    flexDirection:"row",
    justifyContent:"space-between",
    padding:5,
  },
  bottomNavText: {
    fontSize: 15,
    marginTop:20
  },
});
