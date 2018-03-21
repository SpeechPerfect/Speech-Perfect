import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, AsyncStorage } from 'react-native'
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo'
import API_ROOT from '../../IP_addresses'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: AsyncStorage.getItem('');
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const data = new FormData()
    data.append("soundFile", {
      uri: this.props.uri,
      type: "audio/vnd.wav",
      name: "testAudio"
    })
    //SEND TO BACK-END
    fetch(`${API_ROOT}/api/audio/upload`, {
      method: "post",
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))

      fetch('http://localhost:5000/api/watson', {
        method: 'POST',
        body: this.props.uri,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        // body: JSON.stringify({
        //   firstParam: 'yourValue',
        // }),
      })
      .then(result => {
        let results = result._bodyText
        console.log('front end', this.props.uri, result, 'the end')
        return this.props.uri
      })
      .then(result => console.log(result[0]))
  }

  render() {
    return (
      <View>
        <Button onPress={this.onSubmit} title="click to send audio" />
      </View>
    )
  }
}

export default Uploader
