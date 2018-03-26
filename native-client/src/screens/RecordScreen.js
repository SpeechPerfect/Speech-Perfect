import React, { Component } from 'react'
import { View } from 'react-native'
import  {Recorder}  from '../components'
import styles from '../../assets/stylesheet'

export default class RecordScreen extends Component {
  static navigationOptions = {
    title: 'Record',
  };

  render() {
    return (
      <View style={styles.container}>
           <Recorder navigation={this.props.navigation} />
      </View>

    )
  }
}

