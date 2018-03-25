import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableHighlight, Alert } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'
import { List, ListItem, SearchBar, Card, } from "react-native-elements"


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

  let pace = null

  let speechData = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ', pace], ['Um Count: ', umCount], ['Like Count: ', likeCount]]


  return (
  <Card style={{flexDirection:'row', flex:1}}>
   <View style={{flexDirection:'row', flex:1}}>
    <Text>Duration: {duration}</Text>
    <Text>Pace: {umCount}</Text>
   </View>

   <View>
    <Text>Word count: {wordCount}</Text>
   </View>

   <View>
   <Text>"Um" count: {umCount}</Text>
    <Text>"Like" count: {umCount}</Text>
   </View>

   <View>
    <Text>Tone</Text>
   </View>


 
  {/* <FlatList style={{flex: 1}}
        data={this.speechData}
      renderItem={({item}) =>  <Text style={{fontSize: 24, color: 'black'}}>{item[0]} {item[1]}</Text>} /> */}
  </Card>
  )}
}


// (<TouchableHighlight
//   id={item.id} onPress={() => {
//           Alert.alert('The appropriate pace for public speaking is between 140 - 160 words per minute')
//           this.props.navigation.navigate('profile', { speechId: item.id })}
//           } >
//             <Text style={{fontSize: 24, color: 'black'}}>{item[0]} {item[1]}</Text>
//   </TouchableHighlight>)
