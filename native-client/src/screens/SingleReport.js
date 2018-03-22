import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import API_ROOT from '../../IP_addresses.js'
let speech
import axios from 'axios'
export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speech: null
    }
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/api/watson-api/1`, {
      method: "get",
    })
      .then(speech => {
        const speechResult = JSON.parse(speech._bodyText)
        this.setState({
          speech: speechResult
          })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.props.navigation.state.params)
    speech = this.state.speech
    console.log('speech', speech)

    return (
    <View style={styles.resultsContainer}>
      {/* <ScrollView style={styles.resultsTopContainer}> */}
      {speech &&
        <View style={styles.resultsTopContainer}>
            <Text style={{color: 'purple', fontSize:30}}> Duration: {speech.watsonReport.duration/1000} </Text>
            <Text style={{color: 'purple', fontSize:30}}> Um's: {speech.watsonReport.umCount} </Text>
            <Text style={{color: 'purple', fontSize:30}}> Like's: {speech.watsonReport.likeCount} </Text>
        </View>
        }

      <View style={styles.resultsBottomContainer}>
        <View style={styles.audioFeedback}>
          <MaterialCommunityIcons
            name={'play-circle-outline'}
            size={67}
            color={'purple'}
            />
        </View>
        <View style={styles.transcript}>
        {speech &&
          <Text style={{color: 'white', fontSize:30}}> {speech.watsonReport.transcript} </Text>
        }
        </View>
      </View>

    </View>
    )
  }
}

