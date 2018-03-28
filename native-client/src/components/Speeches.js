import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Swipeout from 'react-native-swipeout'
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
import { Ionicons } from '@expo/vector-icons'
import {setSpeechAction} from '../../store'
import styles from '../../assets/stylesheet'

class Speeches extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    this.setState({ data: this.props.speeches})
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.speechesSeparator}
      />
    )
  }

  renderHeader = () => {
    return (<View style={styles.speechesHeaderContainer}>
              <View style={styles.speechesHeaderTextContainer}>
              <Text style={styles.speechesHeaderText}> Your Speeches </Text>
              </View>
              <View style={styles.speechesHeaderDeleteButtonContainer}>
              <TouchableOpacity onPress={() => {
                console.log('DELETING')
                this.props.deleteUsersSpeeches(this.props.id)}}>
                <Ionicons
                  name= "ios-trash"
                  size={26}
                  color= "#12092f" />
              </TouchableOpacity>
            </View>
          </View>)
  }


  _renderItem = ({ item }) => (
    <Swipeout
    right={[{
      text: 'Delete',
      backgroundColor: 'lightgrey',
      color: '#12092f',
      // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        console.log('deleting one')
        this.props.deleteSpeech(item)
    }},
    {
      text: 'Edit',
      color: 'white',
      backgroundColor: '#12092f',
      // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => this.props.setModalVisible(true, item)
    }
    ]}
    autoClose={true}
    backgroundColor= "transparent">
      <TouchableWithoutFeedback id={item.id} onPress={() => {
        this.props.setSpeechAction(item.id)
        this.props.navigation.navigate('singleReport', { userId: item.userId })}} >
        <View style={styles.speechesListItemContainer}>
          {this.props.speeches.length &&
                <View key={item.id} style={styles.speechesListItem}>
                  <SingleSpeechThumbnail speech={item} />
                </View>
          }
        </View>
      </TouchableWithoutFeedback>
     </Swipeout>
  )

  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        {/* <View style={styles.speechesHeader}>
          {this.renderHeader()}
        </View> */}
        <View>
          <FlatList
            keyExtractor= {(speech, index) => index }
            data={this.props.speeches}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
          />
          </View>

      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSpeechAction: (id) => dispatch(setSpeechAction(id))
  }
}
const SpeechesContainer = connect(null, mapDispatchToProps)(Speeches)

export default SpeechesContainer
