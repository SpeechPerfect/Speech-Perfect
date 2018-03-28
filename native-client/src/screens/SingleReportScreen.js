import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, ScrollView, TouchableHighlight, Text } from 'react-native'
import { ReportData, ReplayAudio } from '../components'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'

class SingleReportScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.speech,
        url: this.props.url,
        speechTitle: ''
    }
    this.getSpeech = this.getSpeech.bind(this)
  }

  getSpeech(){
    axios.get(`${API_ROOT}/api/speech/${this.props.speech}/`)
      .then(res => this.setState({speechTitle: res.data.title}))
  }

  componentDidMount(){
    this.getSpeech()
  }


  renderHeader() {
    return (
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderLogoutContainer}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('profile')}>
          <Text> Profile </Text>
        </TouchableHighlight>
        </View>
        <View style={styles.singleReportHeader}>
        <Text style={styles.text}>Report</Text>
        </View>
      </View>
    )
  }

  render() {
    const { speechId, url } = this.state
    return (
    <View style={styles.container}>
      <View>
          {this.renderHeader()}
      </View>
      <View style={styles.speechTitleContainer}>
        <Text style={styles.speechTitle}>{this.state.speechTitle}</Text>
      </View>
      {!!speechId &&
      <ScrollView style={styles.container}>
          <View style={styles.speechListContainer}>
          <ReportData speechId={this.props.speech} />
          </View>
          <View styles={styles.audioButtonContainer}>
         <ReplayAudio speechId={speechId} navigation={this.props.navigation} url={url} />
        </View>
    </ScrollView>}
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    speech: state.speech,
    url: state.url,
    user: state.user
  }
}

const SingleReportScreenContainer = connect(mapStateToProps)(SingleReportScreen)

export default SingleReportScreenContainer



