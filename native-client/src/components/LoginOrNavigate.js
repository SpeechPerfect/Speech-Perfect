import React from 'react'
import MainTabNavigator from '../navigation/MainTabNavigator.js'
import { View, Text, AsyncStorage as store, Button } from 'react-native'

const getLogin = async () => {
    let login = await store.getItem('login')
    login = JSON.parse(login)
    return login
}

const Login = props => {
    return (
        <View>
          <Text>Hello </Text>
          <Button
            title="LogmeIn"
            onPress={() => store.setItem('login', JSON.stringify(true))}
            />
        </View>
    )
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
        store.setItem('login', JSON.stringify(false))
        const loggedin = this.state.loggedin
        return (loggedin) ? <MainTabNavigator /> : <Login />
    }
}

export default LoginOrNavigate
