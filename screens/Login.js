import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputFields}>
        <View style={styles.groupForm}>
          <Text style={styles.labelText} >Username</Text>
          <TextInput style={styles.formControl} />
        </View>
        <View style={styles.groupForm}>
          <Text style={styles.labelText} >Password</Text>
          <TextInput style={styles.formControl} />
        </View>
      </View>

      <View style={styles.inputFields}>
        <TouchableOpacity style={styles.formControlBtn}>
          <Text style={styles.labelLogin}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    margin: "auto",
    border: 2,
    backgroundColor: "grey",
    color: "#FFFFFF",
  },
  loginText: {
    textAlign: "center",
    fontSize: 30
  },
  inputFields: {
    marginBottom: 20
  },
  labelText: {
    width: 203,
    height: 26,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  formControl: {
    width: 300,
    height: 34,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginLeft: -10,
    marginTop: 10
  },
  formControlBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginLeft: -10,
    width: 300,
    height: 34,
  },
  labelLogin: {
    textAlign: "center",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:-10,
    backgroundColor:""
  }
});
