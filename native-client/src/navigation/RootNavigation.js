import { Notifications } from 'expo'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import LoginOrNavigate from '../components/LoginOrNavigate'
import SingleReport from '../screens/SingleReport'
import WordRepetition from '../screens/WordRepetition'
import {  View, StyleSheet, AsyncStorage as store } from 'react-native'
import axios from 'axios'


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: LoginOrNavigate,
    },
    SingleReport: {
      screen: SingleReport,
    },
    WordRepetition: {
      screen: WordRepetition
    },
    initialRouteName: 'Main'
  },
  // {
  //   navigationOptions: () => ({
  //     headerTitleStyle: {
  //       fontWeight: 'normal',
  //     },
  //   }),
  // }
)

export default class RootNavigator extends React.Component {

  render() {
    return (
    <View style={styles.container}>
        <LoginOrNavigate />
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallContainer: {
    flexGrow: 10,
    backgroundColor: 'black',
  },
})
