import React, { Component } from 'react'
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
// import { Spinner } from './Spinner'


export class EditTitleForm extends Component {

    constructor(props) {
      super(props)
      // const { firstName, lastName, email, password } = this.props.user

      this.state = {

      }
    }

    onButtonPress() {
      // let { title } = this.state

      // title = title.length ? title : this.props.title

      // this.props.updateTitle({ title })
    }

  render() {
    // let title = this.props.title
    return (
      <View style={styles.container}>
          <View>
            <Text style={styles.title}> Update Profile </Text>
          </View>
          <TextInput style={styles.inputBox}
          placeholder= {"Test Speech"}
          placeholderTextColor='lightgrey'
          // onChangeText={text => this.setState({ firstName : text })}
          />

          {/* {this.renderButton()} */}
          {/* {this.renderError()} */}

      </View>
    )
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }
    return (
      <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
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
    color: 'rgb(252,197,76)',
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
