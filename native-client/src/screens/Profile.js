import React, { Component } from 'react'
import { Text, ScrollView, View, AsyncStorage as store, Button, TextInput, StyleSheet} from 'react-native'

export default class Profile extends Component {

  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text>Hello</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'lightgrey',
  },
})
