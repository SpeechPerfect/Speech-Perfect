import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'


export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Results',
  };

  render() {
    return (
    <ScrollView style={styles.container}>
      <Text> Will put results here </Text>
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


// import React, {Component} from 'react';
// import { BarChart } from 'react-native-svg-charts'

// // UmmCount,LikeCount (could be a linechart for time and for a single view, but a barchart for an alls view in acct mgmt)    Pace-LineChart
