import React, { Component } from 'react'
import { Text, View, AsyncStorage as store, Button, TextInput} from 'react-native'
import Expo, { Facebook } from 'expo'
import axios from 'axios'
import PasswordInputText from 'react-native-hide-show-password-input'
import FacebookLogin from './FacebookLogin'
import API_ROOT from '../../IP_addresses.js'

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    container: {
        marginTop: 125
    }
}

export default class LoginForm extends Component {
    state = { email: '', password: '', error: false, loggedin: false, user: {} };

    onEmailChange(email) {
        this.setState({email})
    }

    onPasswordChange(password) {
        this.setState({password})
    }

    onButtonPress() {
        const { email, password } = this.state
        axios.post(`${API_ROOT}/auth/login`, {email, password})
            .then(res => {
                store.setItem('user', JSON.stringify(res.data))
                this.setState({error: false, loggedin: true, user: res.data })
            })
            .catch(() => {
                this.setState({error: true})
            })
    }

    renderButton() {
        return <Button className="login" title="Login" onPress={this.onButtonPress.bind(this)} />
    }


    render() {
        const err = this.state.error
        console.log(this.props.navigation)
        if ( this.state.loggedin ) this.props.navigation.navigate('Record')
        return (
            <View style={styles.container}>
              <Text style={{color: 'white'}}>
                Email:
              </Text>
              <TextInput placeholder="username here" onChangeText={ this.onEmailChange.bind(this) } />
              <Text style={{color: 'white'}}>
                Password:
              </Text>
              <PasswordInputText
              placeholder="password here" onChangeText={ this.onPasswordChange.bind(this) } />
              {this.renderButton()}
              {( err ) && <Text>Invalid username or password, please try again</Text>}
              <Text> or </Text>
              <FacebookLogin />
            </View>
        )
    }
}
