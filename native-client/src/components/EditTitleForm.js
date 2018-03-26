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
      console.log('speech', { ...this.props.speech, title })
      updatedSpeech = { ...this.props.speech, title }
      axios.put(`${API_ROOT}/api/speech/${id}`, updatedSpeech)
        .then(updatedTitle => this.props.setModalVisible(false, updatedTitle))
        .then(() => this.setState(this.state))
    }

  render() {
    console.log('edit title form', this.props)
    return (
      <View style={styles.editTitleContainer}>
          <View>
            <Text style={styles.editTitleText}> Update Profile </Text>
          </View>
          <View style={{backgroundColor: 'purple'}} >
            <TextInput style={styles.editTitleInput}
            placeholder= {"Test Speech"}
            placeholderTextColor='white'
            onChangeText={text => this.setState({ title : text })}
            />
          </View>

          {this.renderButton()}

      </View>
    )
  }

  renderButton() {
    return (
      <TouchableOpacity style={{backgroundColor: '#12092f', borderRadius: 20, paddingVertical: 1, paddingHorizontal: 10, margin:10}} onPress={this.onButtonPress.bind(this)}>
            <Text style={styles.editTitleButtonText} > UPDATE </Text>
      </TouchableOpacity>
    )
  }

  renderError() {
      if (this.props.error) {
        return (
          <View style={{backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
          {this.props.error}
          </Text>
          </View>
        )
      }
    }
}


export default EditTitleForm
