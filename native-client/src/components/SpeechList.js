import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'
import { List, ListItem, SearchBar, Card, } from "react-native-elements"


export default class SpeechList extends Component {
  static navigationOptions = {
    title: 'SingleReport'
  };

  constructor(props) {
    super(props)
    this.state = {
        speechData: {}
    }
  }

  componentDidMount = () => {
    console.log('SPEECH ID IS ', this.props.speechId)
    axios.get(`${API_ROOT}/api/speech/watson-data/${this.props.speechId}`)
    .then((res) => res.data)
    .then((speechData) => {
      console.log('speech data is', speechData)
      this.setState({
        speechData
      })
    })
  }

render() {
  console.log('IN SPEECH LIST, state is ', this.state)

  const { duration, likeCount, umCount, wordCount } = this.state.speechData

  let pace = wordCount / (duration / 60)

  let speechData = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ', pace], ['Um Count: ', umCount], ['Like Count: ', likeCount]]


  return (
    <View>
  {speechData && <View style={styles.resultsContainer}>
  <Text style={styles.resultsText}>Duration: {duration}</Text>
  <Text style={styles.resultsText}>Word count: {wordCount}</Text>
  <Text style={styles.resultsText}>"Um" count: {umCount}</Text>
  <Text style={styles.resultsText}>"Like" count: {likeCount}</Text>
  <Text style={styles.resultsText}>Pace: {umCount}</Text>
       </View>}
      </View>
  )
}
}
