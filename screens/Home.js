import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
function Home() {
  const navigation = useNavigation()

  const [EmailAddress, setEmailAddress]= useState("");
  const [Password, setPassword]= useState("");


  async function login() {
    if(EmailAddress == "" || Password == "" ){
      return alert("Please enter all the fields");
    }

    const loginCredentials = {
      EmailAddress:EmailAddress,
      Password: Password
    }
    const log = await axios.post("https://localhost:7119/api/AndroidVoting/Login", loginCredentials)
    console.log(log);
    if(log.data.success === false){
      return alert(log.data.message)
    }
    
    alert(log.data.message);
    if(log.data.results.role === "employee"){
      navigation.navigate('employee')  
    }
    else{
      navigation.navigate('admin')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputFields}>
        <View style={styles.groupForm}>
          <Text style={styles.labelText} >Username</Text>
          <TextInput style={styles.formControl} onChangeText={(event)=>setEmailAddress(event) }/>
        </View>
        <View style={styles.groupForm}>
          <Text style={styles.labelText} >Password</Text>
          <TextInput style={styles.formControl} onChangeText={(event)=>setPassword(event) }/>
        </View>
      </View>

      <View style={styles.inputFields}>
        <TouchableOpacity style={styles.formControlBtn} onPress={login}>
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
    backgroundColor: "#858585",
    color: "#FFFFFF",
    marginTop: 220
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
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  formControlBtn: {
    backgroundColor: "#9F97AB",
    borderRadius: 5,
    padding: 10,
    width: 300,
    height: 34,
  },
  labelLogin: {
    textAlign: "center",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: -10,
  }
});


export default Home;