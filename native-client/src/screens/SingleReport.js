import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Alert } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import Expo from 'expo'
import {SpeechList} from '../components'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'

import { List, ListItem } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
let soundObject

export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.navigation.state.params.speechId,
        awsData: null,
        playing: false,
        started: false,
    }
    this.navigateTranscript = this.navigateTranscript.bind(this)
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/api/speech/aws-data/${this.state.speechId}`)
    .then(res => res.data)
    .then((awsData) => {
      this.setState({
        awsData
      })
    })
  }

  _playAudio = async () => {
    soundObject = new Expo.Audio.Sound()

    this.setState({playing: true, started: true})
    try {
      await soundObject.loadAsync({ uri: `${this.state.awsData.url}`})
      await soundObject.playAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  navigateTranscript(){
    this.props.navigation.navigate('WordRepetition', { speechId: this.props.navigation.state.params.speechId, userId: this.props.navigation.state.params.userId})
  }

  _pauseAudio = async () => {
    let playing = this.state.playing

    if (playing) {
      this.setState({playing: false})
      try {
        await soundObject.pauseAsync()
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    } else {
      this.setState({playing: true})
      await soundObject.playAsync()
    }
  }

  render() {
    console.log('DATA IS', this.state.awsData)

    return (
      <View>
      <View>
        {this.state.speechId &&
          <SpeechList speechId={this.state.speechId} />
        }
      </View>
  <Card>
    <TouchableHighlight onPress={this.navigateTranscript}><Text style={{fontSize: 25,fontWeight: 'bold'}}>View Transcript</Text></TouchableHighlight>
  </Card>
  <Card>
    <View style={styles.audioFeedback}>
          {!this.state.started &&
          <TouchableHighlight onPress={this._playAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
          }
          {this.state.started && this.state.playing &&
            <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'pause-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
          }
           {this.state.started && !this.state.playing &&
          <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
           }
        </View>
        <Text style={{fontSize: 25,fontWeight: 'bold'}}>Play Audio</Text>
      </Card>
    </View>
    )
  }
}

