import React, { Component } from "react"
import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { List, ListItem, SearchBar, Card, Avatar } from "react-native-elements"
import Swipeout from 'react-native-swipeout'
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../assets/stylesheet'
import EditModal from './EditModal'

class Speeches extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      // modalVisible: false,
      // id: 0,
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
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    )
  }

  renderHeader = () => {
    return (<View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent:'center'}} >
              <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: 25}}>
              <Text style={{color: '#12092f', fontSize:32, fontFamily:'Geeza Pro' }}> Your Speeches </Text>
              </View>
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 8, marginRight: 5}}>
              <TouchableOpacity onPress={() => {
                console.log('DELETING')
                this.props.deleteUsersSpeeches(this.props.id)}}>
                <Ionicons
                  name="ios-trash"
                  size={26}
                  color="#12092f" />
              </TouchableOpacity>
            </View>
          </View>)
  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return (
      <View
        style={{
          // paddingVertical: 5,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
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
      backgroundColor: 'lightgrey',
      color: '#12092f',
      // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        console.log('deleting one')
        this.props.deleteSpeech(item)
    }},
    {
      text: 'Edit',
      color: '#12092f',
      backgroundColor: 'white',
      // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => this.props.setModalVisible(true, item.id)
    }
    ]}
    autoClose={true}
    backgroundColor= "transparent">
      <TouchableWithoutFeedback id={item.id} onPress={() => this.props.navigation.navigate('singleReport', { speechId: item.id, userId: item.userId })} >
        <View style={{flex:1,flexDirection: 'column', backgroundColor: '#12092f',borderBottomWidth: 0.5, borderColor: 'white', paddingTop:10, alignItems:'center'}}>
          {this.props.speeches.length &&
                <View key={item.id} style={{height: 50}}>
                  <SingleSpeechThumbnail speech={item} />
                </View>
          }
        </View>
      </TouchableWithoutFeedback>
     </Swipeout>
  )

  render() {
    return (
      <View style={{flex:1,flexDirection: 'column', backgroundColor: '#12092f'}}>
        <View style={{height:35, backgroundColor:'lightgrey'}}>
          {this.renderHeader()}
        </View>
        <View style={{backgroundColor: '#3a3d72'}}>
          <FlatList
            keyExtractor= {(speech, index) => index }
            data={this.props.speeches}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
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

export default Speeches
