import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import RootNavigation from './src/navigation/RootNavigation'
import { Font, AppLoading } from 'expo'
import styles from './assets/stylesheet'


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
        setTimeout(() => this.setState({ fontLoaded: true }), 300)
            }
        }
    // async function _loadAssetsAsync() {

    render() {
        if (!this.state.fontLoaded) {
            return (
              <AppLoading
            //   startAsync={_loadAssetsAsync}
            //   onFinish={() => this.setState({ isReady: true })}
            //   onError={console.warn}
              />
            )
          }

      return (
      <View style={styles.container}>
        {/* what is this element? */}
        {/* <View>
         {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View> */}
        <RootNavigation />
      </View>
    )}
}
