import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'

class EditTitleForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '',
      }
    }

    onButtonPress() {
      id = this.props.speech.id
      title=this.state.title
      updatedSpeech = { ...this.props.speech, title }
      axios.put(`${API_ROOT}/api/speech/${id}`, updatedSpeech)
        .then(updatedTitle => this.props.setModalVisible(false, updatedTitle))
        .then(() => this.setState(this.state))
    }

  render() {
    return (
      <View style={styles.editTitleContainer}>
          <View >
            <TextInput style={styles.editTitleInput}
            placeholder= {"New Speech Title"}
            placeholderTextColor='lightgrey'
            onChangeText={text => this.setState({ title : text })}
            />
          </View>

          {this.renderButton()}

      </View>
    )
  }

  renderButton() {
    return (
      <TouchableOpacity style={styles.editTitleButton} onPress={this.onButtonPress.bind(this)}>
            <Text style={styles.editTitleButtonText} > UPDATE </Text>
      </TouchableOpacity>
    )
  }

  renderError() {
      if (this.props.error) {
        return (
          <View>
          <Text style={styles.errorTextStyle}>
          {this.props.error}
          </Text>
          </View>
        )
      }
    }
}


export default EditTitleForm
