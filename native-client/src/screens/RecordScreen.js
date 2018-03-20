import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import  {Recorder}  from '../components'

export default class RecordScreen extends Component {
  static navigationOptions = {
    title: 'Record',
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
           <Recorder />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: 'black',
  },
})
