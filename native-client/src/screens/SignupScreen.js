import React, { Component } from 'react'
import { View, AsyncStorage as store, Alert } from 'react-native'
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'


export default class SignupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
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

  onConfirmChange(confirmPassword) {
    this.setState({
      confirmPassword
    })
  }

  onButtonPress () {
    const { navigation } = this.props
    const { email, password } = this.state
    axios.post(`${API_ROOT}/auth/signup`, {email, password})
        .then(res => {
            store.setItem('user', JSON.stringify(res.data))
            this.setState({error: false, loggedin: true, user: res.data })
        })
        .then(() => navigation.navigate('SignedIn'))
        .catch(() => {
            this.setState({error: true, email: '', password: '', confirmPassword: ''
          })
            Alert.alert('Error', 'Something went wrong. Please try again.')
        })
    }

  render() {
    console.log(this.state, 'is the state')
    return (
      <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput
      placeholder="Email address..."
      value={this.state.email}
      onChangeText={ this.onEmailChange.bind(this) } />
      <FormLabel>Password</FormLabel>
      <FormInput
      secureTextEntry
      onChangeText = { this.onPasswordChange.bind(this) }
      value={this.state.password}
       placeholder="Password..." />
      <FormLabel>Confirm Password</FormLabel>
      <FormInput
      secureTextEntry
      value={this.state.confirmPassword}
      onChangeText = {this.onConfirmChange.bind(this) }
      placeholder="Confirm Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => this.onButtonPress()}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="transparent"
        textStyle={{ color: '#bcbec1' }}
        title="Sign In"
        onPress={() => this.props.navigation.navigate('SignIn')}
      />
    </Card>
  </View>
    )
  }
}
