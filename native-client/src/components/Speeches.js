import React, { Component } from "react"
import { View, Text, FlatList, Alert, ActivityIndicator, TouchableWithoutFeedback } from "react-native"
import { List, ListItem, SearchBar } from "react-native-elements"
import SingleSpeechThumbnail from './SingleSpeechThumbnail'
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
        this.setState({ data: [
          "Speech1",
          "Speech2",
          "BestSpeechYet",
          "Speech3",
          "Speech1",
          "Speech2",
          "BestSpeechYet",
          "Speech3",
        ] })
  }

  handleRefresh = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //       seed: this.state.seed + 1,
  //       refreshing: true
  //     },
  //     () => {
  //       this.makeRemoteRequest()
  //     }
  //   )
  }

  handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.makeRemoteRequest()
  //     }
  //   )
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
    return <SearchBar placeholder="Type Here..." lightTheme round />
  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback id={item.id} onPress={() => this.props.navigation.navigate('singleReport', { speechId: item.id })} >
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
  )

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
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
      </List>
    )
  }
}

export default Speeches
