import React, { Component } from 'react'
import {Button, View, StyleSheet, Text } from 'react-native'
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo'
import Timer  from './Timer'
import {Uploader} from './'
import RecordButton from './RecordButton'

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
          userId: ''
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
            .then(data => {
              console.log('DATA IS', data)
              this.setState({
                durationMillis: data.durationMillis
              })
            })
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
    try {
      console.log('recording has stopped')
      await this.state.recording.stopAndUnloadAsync()
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
        durationMillis: 0,
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
        </View>
        <View style={styles.bottom}>
          {!this.state.begin &&
          <View style={styles.bottom}>
          <Text style={styles.introText} > Press Record and start speaking </Text>
          <Text> </Text>
          <Text style={styles.text}> We will analyze your speech and </Text>
          <Text style={styles.text}> provide you with suggestions how to improve </Text>
          <Text> </Text>
          </View>
          }
          {this.state.begin &&
          <Uploader navigation={this.props.navigation} uri={this.state.recording._uri} duration={this.state.durationMillis} />
          }
          <View style={styles.startRecording}>
            <Button style={styles.button} color="white" onPress={buttonMethod} title={text}/>
            <RecordButton press={buttonMethod} />
            <Button style={styles.button} color="white" onPress={this.onButtonClear} title="Reset" />
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
    backgroundColor: 'white'
  },
  top: {
    flex: 1,
    backgroundColor: '#12092f',
    borderColor: 'white',
  },
  startRecording: {
    flexDirection: 'row',
    marginBottom: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    backgroundColor: '#12092f',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  introText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: 'white',
    fontSize: 14,
    // fontWeight: "bold",
  }
})
