import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'
import { LinearGradient } from 'expo'

export default class SpeechList extends Component {
  static navigationOptions = {
    title: 'SingleReport'
  }

  constructor(props) {
    super(props)
    this.state = {
      speechData: {}
    }
  }

  componentDidMount = () => {
    console.log('SPEECH ID IS ', this.props.speechId)
    axios
      .get(`${API_ROOT}/api/speech/watson-data/${this.props.speechId}`)
      .then(res => res.data)
      .then(speechData => {
        console.log('speech data is', speechData)
        this.setState({
          speechData
        })
      })
  }

  renderItems(speechData) {
    return speechData.map(data => {
      let label = data[0]
      let value = data[1]
      return (
        <View style={styles.speechListItem}>
          <LinearGradient
            colors={['#5e4ba0', '#413372']}
            style={styles.linearGradientPurple}
          />
          <Text style={styles.speechItemLabel}>{label}</Text>
          <Text style={styles.speechItemValue}>{value}</Text>
        </View>
      )
    })
  }
  render() {
    console.log('IN SPEECH LIST, state is ', this.state)

    const { duration, likeCount, umCount, wordCount } = this.state.speechData

    let pace = Math.floor(wordCount / (duration / 60))

    let minutes = Math.floor(duration / 60) || 0
    let seconds = duration % 60 || 0
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds

    let speechData = [
      ['Duration: ', `${minutes}:${seconds}`],
      ['Word Count: ', wordCount],
      ['Pace: ', `${pace} wpm`],
      ['Um Count: ', umCount],
      ['Like Count: ', likeCount]
    ]

    return (
      <View style={styles.speechListContainer}>
        {this.state.speechData && this.renderItems(speechData)}
      </View>
    )
  }
}
