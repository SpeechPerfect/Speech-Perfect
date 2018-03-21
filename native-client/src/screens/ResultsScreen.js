import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'


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
    <ScrollView style={styles.container}>
     
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
