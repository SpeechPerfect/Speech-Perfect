import React, { Component } from 'react'
import { Button, View, AsyncStorage as store } from 'react-native'
import API_ROOT from '../../IP_addresses'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
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
      data.append('userId', this.state.userId)


      fetch(`${API_ROOT}/api/watson-api/upload`, {
        method: "post",
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.json())
      .then((newData) => console.log(newData, 'is NEW response from server !!!'))
    }
    //SEND TO AWS
    // fetch(`${API_ROOT}/api/audio/upload`, {
    //   method: "post",
    //   body: data,
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => console.log(err))



  render() {
    return (
      <View>
        <Button onPress={this.onSubmit} color="white" title="click to send audio" />
      </View>
    )
  }
}

export default Uploader
