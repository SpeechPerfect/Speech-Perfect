import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import {connect} from 'react-redux'
import Expo from 'expo'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'

let soundObject

class ReplayAudio extends Component {
  static navigationOptions = {
    title: 'SingleReport'
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.speech,
        awsData: null,
        url: this.props.url,
        playing: false,
        started: false
    }
    this.navigateToTranscript = this.navigateToTranscript.bind(this)
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/api/speech/aws-data/${this.state.speechId}`)
    .then(res => res.data)
    .then((awsData) => {
      this.setState({
        url: awsData.url
      })
    })
  }

  _playAudio = async () => {
    let soundUrl = this.state.url ? this.state.url : this.state.awsData.url
    soundObject = new Expo.Audio.Sound()

    this.setState({playing: true, started: true})
    try {
      await soundObject.loadAsync({ uri: soundUrl})
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

  _replayAudio = async () => {
        let playing = this.state.playing

        if (playing) {
          this.setState({playing: false})
          try {
            await soundObject.replayAsync()
            soundObject.playAsync()
          } catch (error) {
            console.log(error)
          }
        } else {
          this.setState({playing: true})
          await soundObject.replayAsync()
          await soundObject.playAsync()
        }
      }

    navigateToTranscript(){
      this.props.navigation.navigate('TranscriptScreen')
    }

  render() {
    console.log('DATA IS', this.props.url)
    return (
      <View style={styles.resultsBottomContainer}>
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
          <TouchableHighlight onPress={this.navigateToTranscript}><Text style={styles.transcriptButtonText}>View Transcript</Text></TouchableHighlight>

        </View>
        <View style={styles.transcript}>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    speech: state.speech
  }
}

const ReplayAudioContainer = connect(mapStateToProps)(ReplayAudio)

export default ReplayAudioContainer

/* <BarChart
data={{
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}}
width={Dimensions.get('window').width}
height={220}
chartConfig={{
  backgroundColor: 'red',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'lightgrey',
  marginRight:20,
  paddingRight:20,
  marginLeft:-20,
  paddingLeft:-20,
  color: (opacity = 1) => `#12092f`,
  style: {
    borderRadius: 16,
    marginRight:20,
    marginLeft:-20,
  paddingLeft:-20,
  paddingRight:20,
  }
}}
//style={{
  marginVertical: 8,
  borderRadius: 16,
  marginRight:20,
  paddingRight:20,
  // marginLeft:-5,
  // paddingLeft:-5,
}}        /> */
