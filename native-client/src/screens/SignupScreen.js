import React, { Component } from 'react'
import { View, AsyncStorage as asyncStore, Alert } from 'react-native'
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import styles from '../../assets/stylesheet'
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
    this.setState({ email })
  }

  onPasswordChange(password) {
    this.setState({ password })
  }

  onConfirmChange(confirmPassword) {
    this.setState({
      confirmPassword
    })
  }

  async onButtonPress() {
    const { navigation } = this.props
    const { email, password } = this.state
    try {
      let res = await axios.post(`${API_ROOT}/auth/signup`, { email, password })
      asyncStore.setItem('user', JSON.stringify(res.data))
      this.setState({ error: false, loggedin: true, user: res.data })
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
            placeholder="Email address..."
            value={this.state.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
            placeholder="Password..."
          />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={this.onConfirmChange.bind(this)}
            placeholder="Confirm Password..."
          />

          <Button
            buttonStyle={styles.signUpButtonStyle}
            backgroundColor="purple"
            title="SIGN UP"
            onPress={() => this.onButtonPress()}
          />
          <Button
            buttonStyle={styles.signInButtonStyle}
            textStyle={styles.signUpButtonTextStyle}
            title="Sign In"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </Card>
      </View>
    )
  }
}
