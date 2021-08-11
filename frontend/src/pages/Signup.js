import React from "react";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    console.log("Openning Signup Page");
    this.state = {
      userLocation: null,
      usersPlaces: [],
      username: null,
      password: null
    };
}

  goback() {
  console.log("Redirecting from Signup to Login");
    this.props.navigation.navigate('Login');
  }

 trySignup = () => {
    // alert('Got logged in');
    var formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
      // alert(this.state.username+'  '+this.state.password);
      fetch('http://172.23.146.208:3000/auth/signup', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body:JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.text())
        .then((responseText) => {
             var data = JSON.parse(responseText);
             alert(data.state)
        })
      .catch(function(error) {
        console.log(error)
        alert('There has been a problem with your fetch operation: ' + error.message);
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <TextInput
          style={styles.inputbox}
          placeholder="username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.text}
          />
          <TextInput style={styles.inputbox} secureTextEntry={true} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <Button title="Signup" onPress={this.trySignup}/>
        </View>
        <View>
            <Text style={{ marginBottom: 20 }}>Already have an account? </Text>
            <Button title="Login" onPress={this.goback.bind(this)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputbox: {
    height: 35,
    width: 250,
    padding: 10,
    borderRadius: 10,
    borderColor: "dodgerblue",
    borderWidth:2,
    marginBottom: 20
  },
  button1:{
    width: 250,

    backgroundColor: "#fff"
  }
});
