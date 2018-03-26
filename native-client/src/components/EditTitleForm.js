import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

export class EditTitleForm extends Component {

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
      <View style={styles.container}>
          <View>
            <Text style={styles.title}> Update Profile </Text>
          </View>
          <View style={{backgroundColor: 'purple'}} >
            <TextInput style={styles.inputBox}
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
            <Text style={styles.buttonText} > UPDATE </Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 100,
  },
  inputBox: {
    width: 300.3,
    height: 15.3,
    // fontFamily: "WorkSans",
    fontSize: 20.7,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    marginVertical: 20,
    color: "#ffffff"
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    marginVertical: 20,
  },
  title: {
    // flex: 1,
    fontSize: 20,
    color: 'rgb(252,197,76)',
    fontWeight: '500',
    marginVertical: 50,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})

  // onFirstNameChange(text) {
  //     this.props.firstNameChanged(text)
  //   }

  //   onLastNameChange(text) {
  //     this.props.lastNameChanged(text)
  //   }
  //   onEmailChange(text) {
  //     this.props.emailChanged(text)
  //   }

  //   onPasswordChange(text) {
  //     this.props.passwordChanged(text)
  //   }
