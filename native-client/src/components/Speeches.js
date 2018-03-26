import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Swipeout from 'react-native-swipeout'
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
import { Ionicons } from '@expo/vector-icons'

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

<<<<<<< HEAD
  renderSpeeches(){
    var swipeoutBtns = [
      {
        text: 'Button'
      }
    ]
    console.log(this.props.speeches)
    let speeches = this.props.speeches.map(speech =>
    <Swipeout right={swipeoutBtns} style={{backgroundColor:'transparent'}}>
    <View style={{ flexDirection:'row', alignItems:'center',alignSelf:'center',justifyContent: 'space-between', width:'90%', height: 75, borderBottomWidth: 0.5,borderColor: ''}}>
      <Avatar
        medium
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('singleReport', { speechId: speech.id, userId: this.props.userId })}>
          <Text style={{color:'white' , fontSize:22, fontFamily:'Avenir-Book'}}>{speech.title}</Text>
        </TouchableOpacity>
        <Text style={{ color:'white', fontSize:15, fontFamily:'Avenir-Book'}}>Duration: 1:06</Text>
      </View>
      <Text style={{ color:'white'}}>
        1/4/2018
      </Text>
    </View>
    </Swipeout>
=======
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '85%',
          backgroundColor: '#12092f',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    )
  }

  renderHeader = () => {
    return (<View style={{flexDirection: 'row', marginTop: 10, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
              <Text style={{color: '#12092f', fontSize: 32, fontFamily: 'Geeza Pro' }}> Your Speeches </Text>
              </View>
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 8, marginRight: 5}}>
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
        <ActivityIndicator animating size= "large" />
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
      onPress: () => this.props.setModalVisible(true, item)
    }
    ]}
    autoClose={true}
    backgroundColor= "transparent">
      <TouchableWithoutFeedback id={item.id} onPress={() => this.props.navigation.navigate('singleReport', { speechId: item.id, userId: item.userId })} >
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'white', paddingTop: 10, alignItems: 'flex-start'}}>
          {this.props.speeches.length &&
                <View key={item.id} style={{height: 50, marginLeft: 20}}>
                  <SingleSpeechThumbnail speech={item} />
                </View>
          }
        </View>
      </TouchableWithoutFeedback>
     </Swipeout>
>>>>>>> 1c9f5e1b921d3d01500af13948c3532f703fb209
  )
    return speeches
  }

  render() {
    return (
<<<<<<< HEAD
      
      <View style={{flex:1,flexDirection: 'column', backgroundColor: '#3a3d72'}}>
        <View style={{borderBottomWidth: 0.5, borderColor: 'white', paddingTop:10, alignItems:'center'}}>
          <Text style={{color:'white' , fontSize:32, fontFamily:'Geeza Pro' }}>Your Speeches</Text>
        </View>
        {this.props.speeches ? this.renderSpeeches() : <Text></Text>}
    </View>
=======
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        <View style={{height: 55, backgroundColor: 'lightgrey'}}>
          {this.renderHeader()}
        </View>
        <View style={{backgroundColor: 'white'}}>
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
>>>>>>> 1c9f5e1b921d3d01500af13948c3532f703fb209
    )
  }
}

export default Speeches
