import React from 'react'
import { Alert, Button, TouchableHighlight, StyleSheet, Text, View } from 'react-native'

let API_ROOT
// if (IS_SIM) {
//   API_ROOT = 'http://localhost:5000'
// } else {
  API_ROOT = 'http://192.168.1.190:5000'
// }

export default class App extends React.Component {
  _onPressButton() {
    fetch(`${API_ROOT}/users`)
    .then((res) => res.text())
    .then((data) => Alert.alert(data))
    // Alert.alert('You tapped the button!');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>fetch</Text>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View>
            <Text>get started</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ecef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 70,
    color: '#b77575'
  }
})
