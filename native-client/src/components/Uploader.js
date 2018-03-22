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
    .then((user) => this.setState({
      userId: user.id
    }))
  }

  onSubmit() {
    store.getItem('user')
    .then(user => JSON.parse(user))
    .then(userData =>
      {
      let data = new FormData()
      data.append("soundFile", {
        uri: this.props.uri,
        type: "audio/vnd.wav",
        name: "testAudio",
        })
      data.append('userId', userData.id)
      return data
    })
    .then((returnedData) => {
      console.log('RETURNED DATA IS ', returnedData)
      fetch(`${API_ROOT}/api/audio/upload`, {
        method: "post",
        body: returnedData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
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
