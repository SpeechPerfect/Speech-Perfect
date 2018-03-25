import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableHighlight, Alert } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'


export default class SpeechList extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speechData: {}
    }
  }

  componentDidMount = () => {
    axios.get(`${API_ROOT}/api/speech/watson-data/${this.props.speechId}`)
    .then((res) => res.data)
    .then((speechData) => {
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
  <View style={styles.resultsContainer}>
  <Text>Duration: {duration}</Text>
  <Text>Word count: {wordCount}</Text>
  <Text>"Um" count: {umCount}</Text>
  <Text>"Like" count: {likeCount}</Text>
  <Text>Pace: {umCount}</Text>
  {/* <FlatList style={{flex: 1}}
        data={this.speechData}
      renderItem={({item}) =>  <Text style={{fontSize: 24, color: 'black'}}>{item[0]} {item[1]}</Text>} /> */}
       </View>
  )}
}


// (<TouchableHighlight
//   id={item.id} onPress={() => {
//           Alert.alert('The appropriate pace for public speaking is between 140 - 160 words per minute')
//           this.props.navigation.navigate('profile', { speechId: item.id })}
//           } >
//             <Text style={{fontSize: 24, color: 'black'}}>{item[0]} {item[1]}</Text>
//   </TouchableHighlight>)
