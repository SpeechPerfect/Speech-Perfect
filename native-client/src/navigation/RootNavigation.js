import { Notifications } from 'expo'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import LoginOrNavigate from '../components/LoginOrNavigate'
import SingleReport from '../screens/SingleReport'
import {  View, StyleSheet, AsyncStorage as store } from 'react-native'
import axios from 'axios'


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    SingleReport: {
      screen: SingleReport
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
        <MainTabNavigator />
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
