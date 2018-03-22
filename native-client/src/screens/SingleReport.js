import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'
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
    fetch(`${API_ROOT}/api/watson-api/${speechId}`, {
      method: "get",
    })
      .then(speech => {
        const speechResult = JSON.parse(speech._bodyText)
        this.setState({
          speech: speechResult
          })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.props.navigation.state.params)
    speech = this.state.speech
    duration = speech ? speech.watsonReport.duration/1000 : ''
    wordCount = speech ? speech.watsonReport.transcript.split(" ").length : ''
    pace = speech ? Math.floor(wordCount / (duration*60)) : ''
    clarity = speech ? Math.floor(wordCount / (duration*60)) : ''

    return (
    <View style={styles.resultsContainer}>
      {speech &&
        <View style={styles.resultsTopContainer}>
            <Text style={{color: '#12092f', fontSize:30}}> Duration: {duration} </Text>
            <Text style={{color: '#12092f', fontSize:30}}> Word Count: {wordCount} </Text>
            <Text style={{color: '#12092f', fontSize:30}}> Pace: {pace} words/minute</Text>
            <Text style={{color: '#12092f', fontSize:30}}> Clarity: {pace} words/minute</Text>
            <Text style={{color: '#12092f', fontSize:30}}> Um's: {speech.watsonReport.umCount} </Text>
            <Text style={{color: '#12092f', fontSize:30}}> Like's: {speech.watsonReport.likeCount} </Text>
        </View>
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

