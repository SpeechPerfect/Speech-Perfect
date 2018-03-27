import React, { Component } from 'react'
import {Button, View, Text, AsyncStorage as store } from 'react-native'
import Expo, { Audio, Permissions } from 'expo'
import Timer  from './Timer'
import { Uploader, RecordButton } from './'
import styles from '../../assets/stylesheet'

export default class Recorder extends Component {
    constructor(){
        super()
        this.state = {
          haveRecordingPermissions: false,
          isRecording: false,
          recording: {},
          durationMillis: '',
          isClicked: false,
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.onButtonClear = this.onButtonClear.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY))
        this.recordingSettings.ios.outputFormat = Expo.Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM
        this.recordingSettings.ios.extension = '.wav'
    }

    componentWillMount = async () => {
        let user = await store.getItem('user')
        if (!user) this.props.navigation.navigate('Login')
    }

    componentDidMount = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        this.setState({
          haveRecordingPermissions: response.status === 'granted',
        })
  }

    renderHeader() {
      return (
        <View >
          <Text style={styles.text}>Record</Text>
        </View>
      )
    }

    async startRecording() {
      this.startTimer()
      const recording = new Expo.Audio.Recording()
      this.setState({recording: recording, isRecording: true})
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
    this.setState({isRecording: false})
    try {
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
        durationMillis: 0,
        duration: null,
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

  frame = () => {
      if (this.state.isClicked) {
        const duration = new Date().getTime() - this.startTime
        this.setState({duration})
      }
      if (this.state.duration > 0 && this.state.isClicked) {
        requestAnimationFrame(this.frame)
      }
  }

  render() {
    let buttonMethod
    this.state.isRecording ? buttonMethod = this.stopRecording : buttonMethod = this.startRecording
    return  (
      <View style={styles.container}>
        <View style={styles.recorderHeader}>
        {this.renderHeader()}
        </View>
        <View style={styles.recorderTopContainer}>
          <Timer duration={this.state.duration} />
        </View>
        <View style={styles.recorderBottomContainer}>
          <RecordButton press={buttonMethod} />
          {this.state.begin ?
          <View style={styles.recorderBuffer}>
            <Text style={styles.whiteText}>''</Text>
          </View>
          :
          <View style={styles.recorderBottomText}>
            <Text style={styles.recorderIntroText} > Press the mic and start speaking </Text>
            <Text style={styles.recorderText}> We will analyze your speech and </Text>
            <Text style={styles.recorderText}> provide you with suggestions on how to improve </Text>
          </View>
          }
          {(this.state.begin && this.state.isClicked) ?
          <View style={styles.recorderIntroText}>
            <Text style={styles.recorderStopText} > Press the mic to stop recording </Text>
          </View>
          :
          <View style={styles.recorderBottomText}>
          <Text style={styles.recorderStopText} />
          </View>
          }
          <View style={styles.recorderBottomText}>
            {this.state.begin &&
            <View style={styles.recorderButtons}>
              <View style={styles.recorderUpload}>
                <Button style={styles.recorderButton} color="white" onPress={this.onButtonClear} title="reset" />
              </View>
              {!this.state.isClicked &&
              <View style={styles.recorderUpload}>
                <Uploader navigation={this.props.navigation} uri={this.state.recording._uri} duration={this.state.durationMillis} />
              </View>
              }
            </View>
            }
          </View>
        </View>
      </View>
    )
  }
}
