import React from 'react'
import MainTabNavigator from '../navigation/MainTabNavigator.js'
import { View, Text } from 'react-native'

const Login = props => {
    return (
        <View>
          <Text>Hello </Text>
        </View>
    )
}

const LoginOrNavigate = props => {
    const loggedin = false
    return (loggedin) ? <MainTabNavigator /> : <Login />
}

export default LoginOrNavigate
