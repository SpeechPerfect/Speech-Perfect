import React, { Component } from 'react'
import { Text, ScrollView, View, Button, AsyncStorage as store} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import SingleSpeechThumbnail from '../components/SingleSpeechThumbnail'
import Speeches from '../components/Speeches'

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
    headerLeft: <Button title='' color='white' onPress={() => {}} />,
    // headerTintColor: 'rgb(252,197,76)',
  }

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

  deleteSpeech = (speech) => {
    axios.delete(`${API_ROOT}/api/speech/${speech.id}`)
    // .then(res => res.data)
    .then(() => this.getSpeeches())
    .then(err => console.log(err))
  }

  editSpeech = (speech) => {
    axios.put(`${API_ROOT}/api/speech/${speech.id}`)
    // .then(res => res.data)
    .then(() => this.getSpeeches())
    .then(err => console.log(err))
  }

  deleteUsersSpeeches = (userId) => {
    axios.delete(`${API_ROOT}/api/speech/all/${userId}`)
    // .then(res => res.data)
    .then(() => this.getSpeeches())
    .then(err => console.log(err))
  }

  getSpeeches() {
    axios.get(`${API_ROOT}/api/user/${this.state.id}`)
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
      <View style={styles.container}>
        <Speeches id={id} speeches={speeches} navigation={this.props.navigation} deleteSpeech={this.deleteSpeech.bind(this)} deleteUsersSpeeches={this.deleteUsersSpeeches.bind(this)} editSpeech={this.editSpeech.bind(this)} />
      </View>
    )
  }
}
