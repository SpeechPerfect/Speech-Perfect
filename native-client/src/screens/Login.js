import React, { Component } from 'react'
import { View } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import  {Login}  from '../components'
import styles from '../../assets/stylesheet'

export default class LoginScreen extends Component {
    static navigationOptions = { title: 'Login' }

    render() {
        return (
            <View style={styles.container}>
              <Login navigation={this.props.navigation} />
            </View>
        )
    }
}
