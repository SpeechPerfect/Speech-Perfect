import React, { Component } from 'react'
import { Alert, Button, View, AsyncStorage as store } from 'react-native'
import API_ROOT from '../../IP_addresses'

const sendToAws = (data, id) => {
    fetch(`${API_ROOT}/api/audio/upload/${id}`, {
        method: 'post',
        body: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      speechId: null
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
      data.append('soundFile', {
        uri: this.props.uri,
        type: 'audio/vnd.wav',
        name: 'testAudio'
        })
      data.append('duration', this.props.duration)

      fetch(`${API_ROOT}/api/watson-api/upload/${this.state.userId}`, {
        method: 'post',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
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
          // Alert.alert('Poor recording quality', 'Please re-record your message for best accuracy.')
          throw new Error('Poor recording quality')
        }
          this.setState({
            speechId: idOrError
          })
          sendToAws(data, idOrError)
      })
      .then(() => {
        // navigate to profile page
      this.props.navigation.navigate('singleReport', { speechId: this.state.speechId, userId: this.state.userId })
      })
      .catch(err => console.log(err))
    }

  render() {
    console.log('DURATION IS', this.props.duration)
    return (
      <View>
        <Button onPress={this.onSubmit} color="#12092f" title="click to send audio" />
      </View>
    )
  }
}

export default Uploader
