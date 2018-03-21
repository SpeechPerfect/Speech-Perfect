import React, { Component } from 'react'
import {Button, View, StyleSheet, Text, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo'
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons'
import Timer  from './Timer'
import {Uploader} from './'

export default class Recorder extends Component {
    constructor(){
        super()
        this.state = {
          haveRecordingPermissions: false,
          isRecording: false,
          recordingDuration: null,
          recording: {},
          timer: null,
          durationMillis: '',
          seconds: '00',
          miliseconds: '00',
          minutes: '',
          hours: '',
          isClicked: false,
          // intervals: 0
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.onButtonClear = this.onButtonClear.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY))
        this.recordingSettings.ios.outputFormat = Expo.Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM
        this.recordingSettings.ios.extension = '.wav'
    }

    componentDidMount = async () => {
        // this.startTimer()
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        this.setState({
          haveRecordingPermissions: response.status === 'granted',
        })
      }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    _renderTitle() {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }

    async startRecording() {
      this.startTimer()
      const recording = new Expo.Audio.Recording()
      this.setState({recording:recording, isRecording: true})
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      })
      recording.setOnRecordingStatusUpdate(status => this.setState(status))
      try {
        await this.state.recording.prepareToRecordAsync(this.recordingSettings)
        await this.state.recording.startAsync()
        console.log('recording has begun')
        setTimeout(async () => {
           await this.state.recording.getStatusAsync()
            .then(data => console.log(data))
        }, 2000)
        // You are now recording!
      } catch (error) {
        console.log(error)
        // An error occurred!
      }
    }

  async stopRecording(){
    clearInterval(this.state.timer)
    this.setState({isRecording: false})
    console.log('recording object', this.state.recording)
    try {
      console.log('recording has stopped')
      await this.state.recording.stopAndUnloadAsync()
      console.log('our recording')
      console.log(this.state.recording._uri)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      isClicked: !this.state.isClicked,

    })
  }

  onButtonClear() {
    this.setState({
        timer: null,
        miliseconds: '00',
        seconds: '00',
        minutes: '',
        hours: '',
        isClicked: false,
        duration: 0,
        intervals: 0,
        begin: false,
    })
    this.setState({
      isClicked: false,
      begin: false,
    })
    this.stopRecording()
}

  startTimer() {
    this.setState({begin: true, isClicked: true})
    let start = (new Date()).getTime()
    this.startFrame(start)
  }

  startFrame = (startTime) => {
    this.startTime = startTime
    requestAnimationFrame(this.frame)
  }

  frame = (time) => {

      if (this.state.isClicked) {
        const duration = new Date().getTime() - this.startTime
        this.setState({duration})
      }
      if (this.state.duration > 0 && this.state.isClicked) {
        requestAnimationFrame(this.frame)
      }
  }

  render() {
    let text
    let buttonMethod
    this.state.isRecording ? text = 'Stop' : text = 'Record'
    this.state.isRecording ? buttonMethod = this.stopRecording : buttonMethod = this.startRecording
    seconds = this.state.seconds
    return  (
      <View style={styles.container}>
        <View style={styles.top}>
          <Timer duration={this.state.duration} />
          <Text style={{color: 'white', fontSize: 64, marginLeft: -10}}>
            { !this.state.begin ?
                0.0 :
                (this.state.duration / 1000).toFixed(1)
            }
          </Text>
        </View>
        <View style={styles.bottom}>
          <Uploader uri={this.state.recording._uri} />
          <View style={styles.startRecording}>
            <Button onPress={buttonMethod} title={text}/>
            <View style={styles.backgroundCircle}>
              <TouchableWithoutFeedback onPress={buttonMethod}>
                  <View style={styles.innerBackgroundCicrcle}>
                    <View style={{ flex: 1, marginLeft: -14, marginTop: -14}}>
                      <MaterialCommunityIcons
                      name={'record'}
                      size={67}
                      color={'red'}
                      // style={{borderColor:'yellow', borderWidth:3, borderRadius:40 }}
                      />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Button onPress={this.onButtonClear} title="Reset"/>

          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'black'
  },
  top: {
    flex: 1,
    backgroundColor: 'black',
        // borderBottom: 15,
    // borderBottomWidth: 3,
    borderColor: 'white',
  },
  startRecording: {
    flexDirection: 'row',
    marginBottom: 13,
    // height: 40,
    // borderRadius: 15,
    // borderColor: '#d6d7da',
    // borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backgroundCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 27.5,
    // marginRight: 10, paddingRight: 10
  },
  innerBackgroundCicrcle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 25,
  }
})
// #F0EFF5
