import React, { Component } from "react"
import { View, AsyncStorage as store } from "react-native"
import { Card, Button, FormLabel, FormInput } from "react-native-elements"
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
// import { onSignIn } from "../auth"



export default class SignupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: false,
      loggedin: false,
      user: {}
    }
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onEmailChange(email) {
    this.setState({email})
  }

  onPasswordChange(password) {
    this.setState({password})
  }

  onButtonPress () {
    const { navigation } = this.props
    const { email, password } = this.state
    axios.post(`${API_ROOT}/auth/signup`, {email, password})
        .then(res => {
            console.log('GOT A RESPONSE FROM SERVER')
            store.setItem('user', JSON.stringify(res.data))
            this.setState({error: false, loggedin: true, user: res.data })
        })
        .catch(() => {
            this.setState({error: true})
        })
      .then(() => console.log('SIGNED IN NOW'))
      .then(() => navigation.navigate("SignedIn"))
    }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput
      placeholder="Email address..."
      onChangeText={ this.onEmailChange.bind(this) } />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />
      <FormLabel>Confirm Password</FormLabel>
      <FormInput
      secureTextEntry
      placeholder="Confirm Password..."
      onChangeText = { this.onPasswordChange.bind(this) } />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => this.onButtonPress()}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="transparent"
        textStyle={{ color: "#bcbec1" }}
        title="Sign In"
        onPress={() => this.props.navigation.navigate("SignIn")}
      />
    </Card>
  </View>
    )
  }
}
