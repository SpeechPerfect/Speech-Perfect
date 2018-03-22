import { Notifications } from 'expo'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import LoginOrNavigate from '../components/LoginOrNavigate'
import SingleReport from '../screens/SingleReport'
import {  View, StyleSheet } from 'react-native'

// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: LoginOrNavigate,
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
  // componentDidMount() {
  //   this._notificationSubscription = this._registerForPushNotifications();
  // }

  // componentWillUnmount() {
  //   this._notificationSubscription && this._notificationSubscription.remove();
  // }

  render() {
    return (
    <View style={styles.container}>
        <LoginOrNavigate />
    </View>
    )
  }

  // _registerForPushNotifications() {
  //   // Send our push token over to our backend so we can receive notifications
  //   // You can comment the following line out if you want to stop receiving
  //   // a notification every time you open the app. Check out the source
  //   // for this function in api/registerForPushNotificationsAsync.js
  //   registerForPushNotificationsAsync();

  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(this._handleNotification);
  // }

  // _handleNotification = ({ origin, data }) => {
  //   console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  // };
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
