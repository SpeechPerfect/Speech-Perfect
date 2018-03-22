import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'
import SpeechList from '../components/Speeches'


export default class ResultsScreen extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  render() {
    return (
    // <ScrollView style={styles.resultsContainer}>
      // <Text style={styles.text}> Will put results here </Text>
      <SpeechList navigation={this.props.navigation} />
    // </ScrollView>
    )
  }
}

// import React, {Component} from 'react';
// import { BarChart } from 'react-native-svg-charts'

// // UmmCount,LikeCount (could be a linechart for time and for a single view, but a barchart for an alls view in acct mgmt)    Pace-LineChart
