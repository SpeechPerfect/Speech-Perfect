import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableHighlight, Alert } from 'react-native'
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo'
import {SpeechList} from '../components'

import { List, ListItem } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
let speech
let soundObject

export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.navigation.state.params.speechId,
        playing: false,
        started: false,
    }
  }

  _renderItem = ({ item }) => (
      <TouchableHighlight
id={item.id} onPress={() => {
        Alert.alert('The appropriate pace for public speaking is between 140 - 160 words per minute')
        this.props.navigation.navigate('profile', { speechId: item.id })}
        } >
          <Text style={{fontSize: 24, color: 'black'}}>{item[0]} {item[1]}</Text>
      </TouchableHighlight>
  )

  _playAudio = async () => {
    soundObject = new Expo.Audio.Sound()

    this.setState({playing: true, started: true})
    try {
      await soundObject.loadAsync({ uri: `${this.state.speech.awsReport.url}`})
      await soundObject.playAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
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
    console.log('STATE IS', this.state)
    // speech = this.state.speechId
    // duration = speech ? speech.watsonReport.duration : ''
    // wordCount = speech ? (speech.watsonReport.transcript.split(' ').length) : ''
    // pace = speech ? Math.floor(wordCount / (duration/60)) : ''
    // clarity = speech ? Math.floor(wordCount / (duration * 60)) : ''
    // umCount = speech ? speech.watsonReport.umCount : ''
    // likeCount = speech ? speech.watsonReport.likeCount : ''
    // let data = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ', pace], ['Um Count: ', umCount], ['Like Count: ', likeCount]]

    return (
    <View style={styles.resultsContainer}>
      {speech &&
        <View>
          <SpeechList speechId={this.state.speechId} />
        <Text>Hello</Text>
        </View>
      }

      {/* <View style={styles.resultsBottomContainer}>
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
        <View style={styles.transcript}>
        {speech &&
          <Text style={{color: 'white', fontSize: 30}}> {speech.watsonReport.transcript} </Text>
        }
        </View>
      </View> */}

    </View>
    )
  }
}

