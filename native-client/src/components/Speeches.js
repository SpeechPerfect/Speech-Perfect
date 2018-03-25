import React, { Component } from "react"
import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { List, ListItem, SearchBar, Card } from "react-native-elements"
import Swipeout from 'react-native-swipeout'
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
import { Ionicons } from '@expo/vector-icons'
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
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }

  renderHeader = () => {
    return <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent:'flex-end', margin:3}} >
            {/* <View style={{width: '95%'}}>
              <SearchBar placeholder="Type Here..." lightTheme round />
            </View>
            <View> */}
              <TouchableOpacity onPress={() => this.props.  deleteUsersSpeeches(this.props.id)}>
                <Ionicons
                  name="ios-trash"
                  size={26}
                  color="#12092f" />
              </TouchableOpacity>
            {/* </View> */}
          </View>
  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return (
      <View
        style={{
          // paddingVertical: 5,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }



  _renderItem = ({ item }) => (
    <Swipeout
    right={[{
      text: 'Delete',
      backgroundColor: '#12092f',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => this.props.deleteSpeech(item)
    }]}
    autoClose={true}
    backgroundColor= 'transparent'>
      <TouchableWithoutFeedback id={item.id} onPress={() => this.props.navigation.navigate('singleReport', { speechId: item.id, userId: item.userId })} >
        <View>
        {this.props.id === null &&
          <Text style={styles.text}>Loading...</Text>}
          {this.props.id &&
                <View key={item.id}>
                  <SingleSpeechThumbnail speech={item} />
                </View>
          }
        </View>
      </TouchableWithoutFeedback>
     </Swipeout>
  )

  render() {
    return (
      <Card>
        <FlatList
          keyExtractor= {(speech, index) => index }
          data={this.props.speeches}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />

    </Card>
    )
  }
}

export default Speeches
