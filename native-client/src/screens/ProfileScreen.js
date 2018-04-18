import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableHighlight,
  AsyncStorage as asyncStore
} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import { Speeches, EditModal } from '../components'
import { fetchSpeeches } from '../../store'

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      email: null,
      id: this.props.user,
      speeches: [],
      modalVisible: false
    }
  }

  componentDidMount() {
    this.props.fetchSpeechData(this.props.user)
  }

  deleteSpeech = speech => {
    const user = this.props.user
    axios
      .delete(`${API_ROOT}/api/speech/${speech.id}`)
      .then(() => this.props.fetchSpeechData(user))
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

  deleteUsersSpeeches = userId => {
    axios
      .delete(`${API_ROOT}/api/speech/all/${userId}`)
      // .then(res => res.data)
      .then(() => this.props.fetchSpeechData(this.props.user))
      .then(err => console.log(err))
  }

  _setModalVisible(visible, item) {
    if (item) {
      this.setState({
        modalVisible: visible,
        selectedSpeech: item,
        id: item.id
      })
      this.props.fetchSpeechData(this.props.user)
    } else {
      this.setState({ modalVisible: visible, id: item.id })
    }
    // console.log('state in modal is', this.state)
  }

  render() {
    const { id } = this.state
    const speeches = this.props.speeches
    return (
      <View style={styles.container}>
        <View>{this.renderHeader()}</View>
        {speeches && (
          <Speeches
            id={id}
            speeches={speeches}
            navigation={this.props.navigation}
            deleteSpeech={this.deleteSpeech.bind(this)}
            deleteUsersSpeeches={this.deleteUsersSpeeches.bind(this)}
            // editSpeech={this.editSpeech.bind(this)}
            setModalVisible={this._setModalVisible.bind(this)}
          />
        )}
        {this.state.modalVisible && (
          <EditModal
            modalVisible={this.state.modalVisible}
            setModalVisible={(vis, speech) => {
              this._setModalVisible(false, speech)
            }}
            id={this.state.id}
            speech={this.state.selectedSpeech}
            style={styles.editModalContainer}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    speeches: state.speeches,
    user: state.user || 0
  }
}

const mapDispatch = dispatch => ({
  fetchSpeechData: user => dispatch(fetchSpeeches(user))
})

const ProfileScreenContainer = connect(mapStateToProps, mapDispatch)(
  ProfileScreen
)

export default ProfileScreenContainer
