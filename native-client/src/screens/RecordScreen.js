import React, { Component } from 'react'
import { View } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import  {Recorder}  from '../components'
import styles from '../../assets/stylesheet'

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

