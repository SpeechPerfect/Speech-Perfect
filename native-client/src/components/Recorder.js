import React, { Component } from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';
import Timer  from './Timer'

export default class Recorder extends Component {
    constructor(){
        super()
        this.state = {
          haveRecordingPermissions: false,
          isRecording: false,
          recordingDuration: null,
          recording: {}
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
    }

    componentDidMount = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        this.setState({
          haveRecordingPermissions: response.status === 'granted',
        })
      }

    // Audio.setAudioModeAsync

    _renderTitle() {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }
    
    _renderTitle() {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }

    async startRecording() {
      const recording = new Expo.Audio.Recording();
      this.setState({recording:recording, isRecording: true})
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
      try {
        await this.state.recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await this.state.recording.startAsync();
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
    this.setState({isRecording: false})
    console.log('recording object', this.state.recording)
    try {
      console.log('recording has stopped')
      await this.state.recording.stopAndUnloadAsync();
      console.log('our recording')
      console.log(this.state.recording)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let text 
    let buttonMethod
    this.state.isRecording ? text = 'Stop Recording' : text = 'Start Recording'
    this.state.isRecording ? buttonMethod = this.stopRecording : buttonMethod = this.startRecording
    return  (
      <View style={styles.container}>
      <View style={styles.top}>
        <Timer />
      </View>
        <View style={styles.bottom}>
          <View style={styles.startRecording}>
            <Button onPress={buttonMethod} title={text}/>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  top: {
    flex: 1,
    height: 200,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
  },
  startRecording: {
    margin: 10,
    height: 40,
    borderRadius: 15,
    borderColor: '#d6d7da',
    borderWidth: 0.5,
    justifyContent: 'center'
  },
  bottom: {
    flex: 2,
    backgroundColor: '#F0EFF5'
  }
});
