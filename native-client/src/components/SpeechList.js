import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableHighlight, Alert } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'


export default class SpeechList extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speech: null,
        playing: false,
        started: false,
    }
  }

  componentDidMount = () => {
    // axios.get(`${API_ROOT}/speech/single/${this.props.speechId}`)
  }

render() {
  // console.log(this.props.navigation.state.params)
  // console.log(this.state.speech)
  // speech = this.state.speech
  // duration = speech ? speech.watsonReport.duration : ''
  // wordCount = speech ? (speech.watsonReport.transcript.split(' ').length) : ''
  // pace = speech ? Math.floor(wordCount / (duration/60)) : ''
  // clarity = speech ? Math.floor(wordCount / (duration * 60)) : ''
  // umCount = speech ? speech.watsonReport.umCount : ''
  // likeCount = speech ? speech.watsonReport.likeCount : ''
  // let data = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ', pace], ['Um Count: ', umCount], ['Like Count: ', likeCount]]

  return (
  <View style={styles.resultsContainer}>
    {/* {speech &&
       <FlatList
         style={{marginLeft: 20}}
         keyExtractor= {(speech, index) => index }
         data={data}
         renderItem={this._renderItem}
         ItemSeparatorComponent={this.renderSeparator}
         ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
         onRefresh={this.handleRefresh}
         refreshing={this.state.refreshing}
         onEndReached={this.handleLoadMore}
         onEndReachedThreshold={50}
       />} */}
       <Text>Hello {this.props.speechId}</Text>
       </View>
  )}
}
