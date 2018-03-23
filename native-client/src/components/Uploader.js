import React, { Component } from 'react'
import { Alert, Button, View, AsyncStorage as store } from 'react-native'
import API_ROOT from '../../IP_addresses'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      haveResults: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    store.getItem('user')
    .then(user => JSON.parse(user))
    .then((userData) => this.setState({
      userId: userData.id
    }))
  }

  onSubmit() {
      const data = new FormData()
      data.append("soundFile", {
        uri: this.props.uri,
        type: "audio/vnd.wav",
        name: "testAudio",
        })

      fetch(`${API_ROOT}/api/watson-api/upload/${this.state.userId}`, {
        method: "post",
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.status === 500) {
          Alert.alert('No audio detected', 'Please re-record')
          throw new Error('No audio found')
        } else {
          return res.json()
        }
      })
      .then(idOrError => {
        if (idOrError === 'Low confidence') {
          console.log('Front end detects low confidence')
          return Alert.alert('Poor recording quality', 'Please re-record your message for best accuracy.')
        } else {
          this.sendToAws(data, idOrError)
        }
      })
      .then(() => this.setState({
        haveResults: true
      }))
      .catch(err => console.log(err))
    }
    //SEND TO AWS
  sendToAws(data, id) {
    fetch(`${API_ROOT}/api/audio/upload/${id}`, {
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
  }

  render() {
    console.log('state is ', this.state)
    return (
      <View>
        <Button onPress={this.onSubmit} color="white" title="click to send audio" />
      </View>
    )
  }
}

export default Uploader
