import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableHighlight, Alert } from 'react-native'
import styles from '../../assets/stylesheet'
import { List, ListItem } from "react-native-elements"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import API_ROOT from '../../IP_addresses.js'
let speech
import axios from 'axios'
export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speech: null
    }
  }

  componentDidMount = () => {
    console.log('params', this.props.navigation.state.params)
    let speechId = this.props.navigation.state.params.speechId
    let userId = this.props.navigation.state.params.userId
    fetch(`${API_ROOT}/api/watson-api/${userId}/${speechId}`, {
      method: "get",
    })
      .then(speech => {
        console.log(speech)
        const speechResult = JSON.parse(speech._bodyText)
        this.setState({
          speech: speechResult
          })
      })
      .catch(err => console.log(err))
  }

  _renderItem = ({ item }) => (
      <TouchableHighlight id={item.id} onPress={() => {
        Alert.alert('The appropriate pace for public speaking is between 140 - 160 words per minute')
        this.props.navigation.navigate('profile', { speechId: item.id })}
        } >
          <Text style={{fontSize: 24, color:'black'}}>{item[0]} {item[1]}</Text>
      </TouchableHighlight>
  )

  render() {
    console.log(this.props.navigation.state.params)
    console.log(this.state.speech)
    speech = this.state.speech
    duration = speech ? speech.watsonReport.duration/1000 : ''
    wordCount = speech ? (speech.watsonReport.transcript.split(" ").length)*100 : ''
    pace = speech ? Math.floor(wordCount / (duration/60)) : ''
    clarity = speech ? Math.floor(wordCount / (duration*60)) : ''
    umCount = speech? speech.watsonReport.umCount : ''
    likeCount = speech? speech.watsonReport.likeCount : ''
    let data = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ',pace], ['Um Count: ', umCount], ['Like Count: ',likeCount]]
    return (
    <View style={styles.resultsContainer}>
      {speech &&
        //  <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
         <FlatList
           style={{marginLeft: 20}}
           keyExtractor= {(speech, index) => index }
           data={data}
           renderItem={this._renderItem}
           ItemSeparatorComponent={this.renderSeparator}
           ListHeaderComponent={this.renderHeader}
           ListFooterComponent={this.renderFooter}
           onRefresh={this.handleRefresh}
           refreshing={this.state.refreshing}
           onEndReached={this.handleLoadMore}
           onEndReachedThreshold={50}
         />
      //  </List>
        // <View style={styles.resultsTopContainer}>
        //     <Text style={{color: '#12092f', fontSize:30}}> Duration: {duration} </Text>
        //     <Text style={{color: '#12092f', fontSize:30}}> Word Count: {wordCount} </Text>
        //     <Text style={{color: '#12092f', fontSize:30}}> Pace: {pace} words/minute</Text>
        //     <Text style={{color: '#12092f', fontSize:30}}> Clarity: {pace} words/minute</Text>
        //     <Text style={{color: '#12092f', fontSize:30}}> Um's: {speech.watsonReport.umCount} </Text>
        //     <Text style={{color: '#12092f', fontSize:30}}> Like's: {speech.watsonReport.likeCount} </Text>
        // </View>
        }

      <View style={styles.resultsBottomContainer}>
        <View style={styles.audioFeedback}>
          <MaterialCommunityIcons
            name={'play-circle-outline'}
            size={67}
            color={'#12092f'}
            />
        </View>
        <View style={styles.transcript}>
        {speech &&
          <Text style={{color: 'white', fontSize:30}}> {speech.watsonReport.transcript} </Text>
        }
        </View>
      </View>

    </View>
    )
  }
}

