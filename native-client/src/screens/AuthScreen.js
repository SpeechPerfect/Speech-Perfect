import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
// import { ExpoLinksView } from '@expo/samples'
import  {LoginScreen, SignupScreen}  from '../screens'
import styles from '../../assets/stylesheet'

export default class AuthScreen extends Component {
    static navigationOptions = { title: 'Welcome' }


    render() {
        console.log(this.state, 'IS THE STATE')
        return (
            <View style={styles.inputFieldContainer}>
                <View>
                <Text>Welcome to Speech Perfect!</Text>
                <Text>Please </Text>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Login')} />
                <Button title="Signup" onPress={() => this.props.navigation.navigate('Signup')} />
                </View>
            </View>
        )
    }
}
