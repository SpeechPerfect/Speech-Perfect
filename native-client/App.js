import React from 'react'
import { Platform, StyleSheet, StatusBar, View } from 'react-native'
import RootNavigation from './src/navigation/RootNavigation'
import { Font, AppLoading } from 'expo'
import styles from './assets/stylesheet'
console.disableYellowBox = true;


export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            fontLoaded: false,
            isReady: false,
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
        }

    render() {
        if (!this.state.fontLoaded) {
            return (
              <AppLoading />
            )
          }

      return (
      <View style={styles.container}>
        {/* what is this element? */}
        <View style={{backgroundColor:'white', height: 18}} >
         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
        <RootNavigation />
      </View>
    )}
}
