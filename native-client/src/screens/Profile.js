import React, { Component } from 'react'
import { View, Button, AsyncStorage as store} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import EditModal from '../components/EditModal'
import {Speeches, Logout} from '../components'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      id: null,
      modalVisible: false,
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
      selectedSpeech: null,
      speeches: [],
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

  _setModalVisible(visible, item) {
    console.log('speech', item)
    if (item) {
      this.setState({ modalVisible: visible, selectedSpeech: item, id: item.id})
    } else this.setState({ modalVisible: visible, id: item.id })
    // this.props.editSpeech(item)
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
        <Speeches id={id} speeches={speeches} navigation={this.props.navigation} deleteSpeech={this.deleteSpeech.bind(this)} deleteUsersSpeeches={this.deleteUsersSpeeches.bind(this)} editSpeech={this.editSpeech.bind(this)} setModalVisible={this._setModalVisible.bind(this)} getUserAndSpeeches={this.getUserAndSpeeches.bind(this)}/>
        {this.state.modalVisible &&
        <EditModal
            modalVisible={ this.state.modalVisible }
            setModalVisible={ (vis) => { this._setModalVisible(false) }}
            id={this.state.id}
            speech={this.state.selectedSpeech}
            getUserAndSpeeches={this.getUserAndSpeeches.bind(this)}
            style={{display:'flex',height:800, width:800, alignItems: 'center', justifyContent: 'center'}}
          />
        }
        {speeches && <View>
          <Logout navigation={this.props.navigation} />
        </View>}
      </View>
    )
  }
}
