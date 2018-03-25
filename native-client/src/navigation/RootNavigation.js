// import { Notifications } from 'expo'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import {SignedInNav} from './MainTabNavigator'
import {SignedOutNav} from './SignedOutNavigator'
// import {SingleReport, WordRepetition, AuthScreen, LoginScreen, SignupScreen} from '../screens'
// import {  View, StyleSheet, AsyncStorage as store } from 'react-native'


// const RootStackNavigator = StackNavigator(
//   {
//     Main: {
//       screen: SignedInNav
//     },
//     // SingleReport: {
//     //   screen: SingleReport,
//     // },
//     // WordRepetition: {
//     //   screen: WordRepetition
//     // },
//     // AuthScreen: {
//     //   screen: AuthScreen
//     // },
//     // Login: {
//     //   screen: LoginScreen
//     // },
//     // Signup: {
//     //   screen: SignupScreen
//     // },
//     initialRouteName: 'Main'
//   },
//   // {
//   //   navigationOptions: () => ({
//   //     headerTitleStyle: {
//   //       fontWeight: 'normal',
//   //     },
//   //   }),
//   // }
// )

// export default class RootNavigator extends React.Component {

//   render() {
//     return (
//     <View style={styles.container}>
//         <SignedInNav />
//     </View>
//     )
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   smallContainer: {
//     flexGrow: 10,
//     backgroundColor: 'black',
//   },
// })

const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedInNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOutNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  )
}

export default createRootNavigator
