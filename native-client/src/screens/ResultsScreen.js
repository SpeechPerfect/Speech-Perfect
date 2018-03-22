import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'


export default class ResultsScreen extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  thesaurorize(data){

  }

  componentWillMount(){
    axios.get(`http://localhost:5000/api/watson-api/2`)
    .then(res =>{
      console.log(res.data)
      // thesaurorize(res.data)
    })
  }

  render() {
    return (
    <ScrollView style={styles.resultsContainer}>
      <Text style={styles.text}> Will put results here </Text>
    </ScrollView>
    )
  }
}

// import React, {Component} from 'react';
// import { BarChart } from 'react-native-svg-charts'

// // UmmCount,LikeCount (could be a linechart for time and for a single view, but a barchart for an alls view in acct mgmt)    Pace-LineChart
