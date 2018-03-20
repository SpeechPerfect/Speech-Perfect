import React, { Component } from 'react'
import { Text, ScrollView, View, AsyncStorage as store, Button, TextInput, StyleSheet} from 'react-native'

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

  componentDidMount() {
    store.getItem('user')
    .then(userData => JSON.parse(userData))
    .then((data) => {
      console.log('data is', data)
      this.setState({
      email: data.email,
      id: data.id
    })
    })
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView style={styles.container}>
      <Text></Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'lightgrey',
  },
})
