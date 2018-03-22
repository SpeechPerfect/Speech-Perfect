import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'


export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  render() {
    return (
    <ScrollView style={styles.resultsContainer}>
      <Text style={styles.text}> Will put results here </Text>
    </ScrollView>
    )
  }
}

