import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
// import { ExpoLinksView } from '@expo/samples'
import  {Login, Signup}  from '../components'
import styles from '../../assets/stylesheet'

export default class AuthScreen extends Component {
    static navigationOptions = { title: 'Login' }

    constructor(props) {
        super(props)
        this.state = {
            showLogin: false,
            showSignup: false
        }
        this.toggleForms = this.toggleForms.bind(this)
    }

    toggleForms(event) {
        console.log('event target title is ', event)
        // const formName = event.target.title
        // this.setState({
        //     [formName]: !this.state.show[formName]
        // })
    }

    render() {
        return (
            <View style={styles.inputFieldContainer}>
                <Text>Welcome to Speech Perfect!</Text>
                <Text>Please </Text>
                <Button title="Login" onPress={this.toggleForms} />
                <Button title="Signup" onPress={this.toggleForms} />
                {this.state.showLogin && <Login />}
                {this.state.showSignup && <Signup />}
              {/* <Login style={styles.container} navigation={this.props.navigation} /> */}
            </View>
        )
    }
}
