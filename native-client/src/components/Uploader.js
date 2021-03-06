import React, { Component } from 'react'
import { Alert, Button, View } from 'react-native'
import { connect } from 'react-redux'
import { isLoadingAction, setSpeechAction, editUrlAction } from '../../store'
import API_ROOT from '../../IP_addresses'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user,
      url: '',
      speechId: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  sendToAws(data, id) {
    return fetch(`${API_ROOT}/api/audio/upload/${id}`, {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.json())
      .then(awsData => {
        editUrlAction(awsData.url)
      })
      .then(() => this.state.url)
      .catch(err => console.log(err))
  }

  onSubmit() {
    const { isLoadingAction, setSpeechAction, editUrlAction } = this.props
    const data = new FormData()
    data.append('soundFile', {
      uri: this.props.uri,
      type: 'audio/vnd.wav',
      name: 'testAudio'
    })
    data.append('duration', this.props.duration)

    isLoadingAction(true)
    fetch(`${API_ROOT}/api/watson-api/upload/${this.state.userId}`, {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
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
          Alert.alert(
            'Poor recording quality',
            'Please re-record your message for best accuracy.'
          )
          isLoadingAction(false)
          throw new Error('Poor recording quality')
        }
        setSpeechAction(idOrError)
        return idOrError
      })
      .then(id => this.sendToAws(data, id))
      .then(() => {
        isLoadingAction(false)
        this.props.navigation.navigate('singleReport')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View>
        <Button onPress={this.onSubmit} color="white" title="analyze" />
      </View>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    loading: state.loading,
    speech: state.speech,
    url: state.url,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  isLoadingAction: loading => dispatch(isLoadingAction(loading)),
  setSpeechAction: id => dispatch(setSpeechAction(id)),
  editUrlAction: url => dispatch(editUrlAction(url))
})

const UploaderContainer = connect(mapStateToProps, mapDispatchToProps)(Uploader)

export default UploaderContainer
