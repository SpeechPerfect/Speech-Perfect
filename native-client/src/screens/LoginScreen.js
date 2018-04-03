import React, { Component } from 'react'
import { View, AsyncStorage as asyncStore, Alert } from 'react-native'
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'

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
    this.setState({ email })
  }

  onPasswordChange(password) {
    this.setState({ password })
  }

  async onButtonPress() {
    const { navigation } = this.props
    const { email, password } = this.state
    try {
      let res = await axios.post(`${API_ROOT}/auth/login`, { email, password })
      asyncStore.setItem('user', JSON.stringify(res.data))
      this.setState({ error: false, loggedin: true, user: res.data })
      console.log('SIGNED IN NOW')
      navigation.navigate('SignedIn')
    } catch (err) {
      this.setState({
        error: true,
        email: '',
        password: '',
        confirmPassword: ''
      })
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  render() {
    return (
      <View style={styles.signUpView}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.email}
            placeholder="Email address..."
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
            secureTextEntry
            placeholder="Password..."
          />

          <Button
            buttonStyle={styles.signUpButtonStyle}
            // backgroundColor="purple"
            title="SIGN IN"
            onPress={() => this.onButtonPress()}
          />
        </Card>
      </View>
    )
  }
}
