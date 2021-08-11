import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log("Opening Login Page");
    this.state = {
      userLocation: null,
      usersPlaces: [],
      username: null,
      password: null,
      id: null
    };
}

  signup = () => {
    console.log("Redirecting from Login to Signup");
    this.props.navigation.navigate('Signup');
    // Actions.signup()
  }
 tryLogin = () => {
      // alert(this.state.username+'  '+this.state.password);

      fetch('http://172.23.146.208:3000/auth/login', {
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
             if(data.state === 'success'){
              global.active_user = this.state.username;
              // GetUserId(this.state.username);
              fetch('http://172.23.146.208:3000/auth/success/'+this.state.username)
              .then((responsed) => responsed.json())
                  .then((responsedJson) => {
                      // var data = JSON.parse(responseText);
                      // alert(responseJson.id);
                      global.active_user_id = responsedJson.id;
                      console.log("Redirecting Login to profile")
                      this.props.navigation.navigate('Camera_page');
                  })
             }else{
               alert(data.state)
             }
        })
      .catch(function(error) {
        console.log(error)
        console.log('There has been a problem with your fetch operation: ' + error.message);
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
          <TextInput secureTextEntry={true} placeholder="password" style={styles.inputbox} onChangeText={(password) => this.setState({password})}/>
          <View style={styles.button1}>
          <Button title="Login" onPress={this.tryLogin.bind(this)}/>
          </View>
        </View>
        <View>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>Don't have an account? </Text>
            <Button title="Signup" style={styles.button1} onPress={this.signup.bind(this)}/>
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
