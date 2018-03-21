import React, { Component } from 'react'
import { Text, ScrollView, View, AsyncStorage as store} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import SingleSpeechThumbnail from '../components/SingleSpeechThumbnail'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      id: null
    }
  }

  static navigationOptions = {
    title: 'Profile',
  };

  getUserAndSpeeches() {
    store.getItem('user')
    .then(userData => JSON.parse(userData))
    .then((data) => {
      this.setState({
      email: data.email,
      id: data.id,
      speeches: []
      })
    })
    .then(() => this.getSpeeches())
    .catch(err => console.log(err))
  }

  getSpeeches() {
    axios.get(`${API_ROOT}/api/speech/${this.state.id}`)
    .then(res => res.data)
    .then((data) => this.setState({
      speeches: data
    }))
    .then(err => console.log(err))
  }

  componentDidMount() {
    this.getUserAndSpeeches()
  }


  render() {
    const { id, speeches } = this.state
    return (
      <ScrollView style={styles.resultsContainer}>
      {id === null &&
      <Text style={styles.text}>Loading...</Text>}
      {id &&
        speeches.map(speech => {
          return (
            <View key={speech.id}>
            <SingleSpeechThumbnail navigation={this.props.navigation} speech={speech} />
            </View>
          )
        }
      )}
      </ScrollView>
    )
  }
}
