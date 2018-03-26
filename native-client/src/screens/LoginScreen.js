import React, {Component} from 'react'
import { View, AsyncStorage as store, Alert } from 'react-native'
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'

export default class LoginScreen extends Component {
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
    axios.post(`${API_ROOT}/auth/login`, {email, password})
        .then(res => {
            store.setItem('user', JSON.stringify(res.data))
            this.setState({error: false, loggedin: true, user: res.data })
        })
        .then(() => console.log('SIGNED IN NOW'))
        .then(() => navigation.navigate("SignedIn"))
        .catch(() => {
          this.setState({error: true, email: '', password: '', confirmPassword: ''
        })
          Alert.alert('Error', 'Something went wrong. Please try again.')
      })
    }

  render() {

    return (
      <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput
      onChangeText={ this.onEmailChange.bind(this) }
      value={this.state.email}
      placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput
      onChangeText={ this.onPasswordChange.bind(this) }
      value={this.state.password}
      secureTextEntry placeholder="Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => this.onButtonPress()}
      />
    </Card>
  </View>
    )
  }
}
