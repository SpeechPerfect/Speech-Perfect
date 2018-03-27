import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, TouchableHighlight, AsyncStorage as asyncStore} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import { Speeches, EditModal } from '../components'

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: null,
      id: this.props.user,
      speeches: [],
      modalVisible: false,
    }
  }

  deleteSpeech = (speech) => {
    axios.delete(`${API_ROOT}/api/speech/${speech.id}`)
    .then(() => this.getSpeeches())
    .then(err => console.log(err))
  }

  renderHeader() {
    return (
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderTitle}>
        <Text style={styles.text}>Speeches</Text>
        </View>
        <View style={styles.profileHeaderLogoutContainer}>
        <TouchableHighlight onPress={() => this.logout()}>
          <Text> Logout </Text>
        </TouchableHighlight>
        </View>
      </View>
    )
  }

  logout() {
    asyncStore.removeItem('user')
    this.props.navigation.navigate('SignedOut')
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
    } else {this.setState({ modalVisible: visible, id: item.id })}
    // this.props.editSpeech(item)
  }

  getSpeeches() {
    axios.get(`${API_ROOT}/api/user/${this.props.user}`)
    .then(res => res.data)
    .then((data) => this.setState({
      speeches: data
    }))
    .then(err => console.log(err))
  }

  componentDidMount() {
   this.getSpeeches()
  }

  render() {
    const { id, speeches } = this.state
    console.log(this.props.user, 'IS THE USER!')
    console.log(speeches, 'ARE THE SPEECHES IN PROFILE SCREEN')
    return (
      <View style={styles.container}>
       <View>
          {this.renderHeader()}
        </View>
        {speeches && <Speeches
        id={id}
        speeches={speeches}
        navigation={this.props.navigation}
        deleteSpeech={this.deleteSpeech.bind(this)} deleteUsersSpeeches={this.deleteUsersSpeeches.bind(this)}
        editSpeech={this.editSpeech.bind(this)} setModalVisible={this._setModalVisible.bind(this)} />}
        {this.state.modalVisible &&
        <EditModal
            modalVisible={ this.state.modalVisible }
            setModalVisible={ (vis, speech) => { this._setModalVisible(false, speech) }}
            id={this.state.id}
            speech={this.state.selectedSpeech}
            getUserAndSpeeches={this.getUserAndSpeeches.bind(this)}
            style={styles.editModalContainer}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    speeches: state.speeches,
    user: state.user
  }
}

const ProfileScreenContainer = connect(mapStateToProps)(ProfileScreen)

export default ProfileScreenContainer
