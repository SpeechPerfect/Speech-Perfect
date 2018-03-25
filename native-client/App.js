import React from 'react'
import { Platform, StyleSheet, StatusBar, View, AsyncStorage as store } from 'react-native'
import createRootNavigator from './src/navigation/RootNavigation'
import {SignedOutNav} from './src/navigation/SignedOutNavigator'
import {SignedInNav} from './src/navigation/MainTabNavigator'
import { Font, AppLoading } from 'expo'
import styles from './assets/stylesheet'
console.disableYellowBox = true


export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            fontLoaded: false,
            isReady: false,
            signedIn: false,
            checkedSignedIn: false
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android'){
            Font.loadAsync({
                Arial: require('./fonts/Arial.ttf')
            })
                .then(() => this.setState({ fontLoaded: true }))
        }
        else {
        setTimeout(() => this.setState({ fontLoaded: true }), 1100)
            }

            store.getItem('user')
        .then((user) => JSON.parse(user))
        .then(userData => {
            console.log('user data is ', userData)
        })
        .then(userData => {
            if (userData.id) {
                this.setState({
                    signedIn: true,
                    checkedSignedIn: true
                })
            }
        })
        .catch(err => console.log(err))
        }

    render() {
        console.log('OH HAI', this.state)
        const { checkedSignIn, signedIn } = this.state
        const Layout = createRootNavigator(signedIn)

        if (!this.state.fontLoaded) {
            return (
              <AppLoading />
            )
          }

      return (
      <View style={styles.container}>
        {/* what is this element? */}
        <View style={{backgroundColor: 'white', height: 18}} >
         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
        {/* {!signedIn &&
        <SignedOutNav />}
        {signedIn && <SignedInNav />} */}
        <Layout />
      </View>
    )}
}
