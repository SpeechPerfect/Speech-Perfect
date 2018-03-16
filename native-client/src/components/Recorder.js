import React, { Component } from 'react';
import {Button, View} from 'react-native';
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';

export default class Recorder extends Component {
    constructor(){
        super()
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
    }

    async startRecording(){
        console.log('pressed')
    const recording = new Expo.Audio.Recording();
      try {  
        await recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        console.log('recording has begun')
        // You are now recording!
      } catch (error) {
        console.log(error)
        // An error occurred!
      }
      console.log('recording is', recording)
  }

  async stopRecording(){
    console.log('pressed stopped')
    const recording = new Expo.Audio.Recording();
    try {  
      console.log('recording has stopped')
      await recording.stopAndUnloadAsync();
      // You are now recording!
    } catch (error) {
      // An error occurred!
    }
}

  render() {
    return  (
      <View>
        <Button onPress={this.startRecording} title="Start recording"/>
        <Button onPress={this.stopRecording} title="Stop recording"/>
      </View>
    ) 
  }
}



