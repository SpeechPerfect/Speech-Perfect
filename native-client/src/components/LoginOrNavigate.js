import React from 'react'
import { AsyncStorage as store } from 'react-native'
import {  View } from 'react-native'
import styles from '../../assets/stylesheet'
import MainTabNavigator from '../navigation/MainTabNavigator.js'
import Login from './Login'

const getLogin = async () => {
    let login = await store.getItem('user')
    login = JSON.parse(login)
    return login
}

class LoginOrNavigate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedin: false
        }
    }

    componentWillMount(){
        getLogin()
            .then(loggedin => {
                this.setState({loggedin})
            })
    }

    render(){
        let loggedin = this.state.loggedin
        console.log('loggedin', loggedin)
        return (
            <View style={styles.container}>
                {(loggedin) ? <MainTabNavigator /> : <Login /> }
            </View>
        )
    }
}

export default LoginOrNavigate
