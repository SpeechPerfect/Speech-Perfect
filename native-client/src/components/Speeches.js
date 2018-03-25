import React, { Component } from "react"
import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { List, ListItem, SearchBar, Card, Avatar } from "react-native-elements"
import Swipeout from 'react-native-swipeout'
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../assets/stylesheet'

class Speeches extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    this.setState({ data: this.props.speeches})
  }

  renderSpeeches(){
    var swipeoutBtns = [
      {
        text: 'Button'
      }
    ]
    console.log(this.props.speeches)
    let speeches = this.props.speeches.map(speech =>
    <Swipeout right={swipeoutBtns} style={{backgroundColor:'transparent'}}>
    <View style={{ flexDirection:'row', alignItems:'center',alignSelf:'center',justifyContent: 'space-between', width:'90%', height: 75, borderBottomWidth: 0.5,borderColor: ''}}>
      <Avatar
        medium
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('singleReport', { speechId: speech.id, userId: this.props.userId })}>
          <Text style={{color:'white' , fontSize:22, fontFamily:'Avenir-Book'}}>{speech.title}</Text>
        </TouchableOpacity>
        <Text style={{ color:'white', fontSize:15, fontFamily:'Avenir-Book'}}>Duration: 1:06</Text>
      </View>
      <Text style={{ color:'white'}}>
        1/4/2018
      </Text>
    </View>
    </Swipeout>
  )
    return speeches
  }

  render() {
    return (
      
      <View style={{flex:1,flexDirection: 'column', backgroundColor: '#3a3d72'}}>
        <View style={{borderBottomWidth: 0.5, borderColor: 'white', paddingTop:10, alignItems:'center'}}>
          <Text style={{color:'white' , fontSize:32, fontFamily:'Geeza Pro' }}>Your Speeches</Text>
        </View>
        {this.props.speeches ? this.renderSpeeches() : <Text></Text>}
    </View>
    )
  }
}

export default Speeches
