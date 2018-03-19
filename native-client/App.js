import React from 'react'
import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native'
import RootNavigation from './src/navigation/RootNavigation'
import { Font, AppLoading } from 'expo'

let API_ROOT
// if (IS_SIM) {
//   API_ROOT = 'http://localhost:5000'
// } else {
API_ROOT = 'http://192.168.1.190:5000'
// }

export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            fontLoaded: false
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android'){
            Font.loadAsync({
                Arial: require('./fonts/Arial.ttf')
            })
                .then(() => this.setState({ fontLoaded: true }))
        }
        else this.setState({ fontLoaded: true })
    }

    _onPressButton() {
        fetch(`${API_ROOT}/users`)
            .then((res) => res.text())
            .then((data) => Alert.alert(data))
        // Alert.alert('You tapped the button!');
    }
    render() {
        if (!this.state.fontLoaded){
            return <AppLoading />
        }
      return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>fetch</Text>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View>
            <Text>get started</Text>
          </View>
        </TouchableHighlight> */}
         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 70,
    color: 'black'
  }
})
