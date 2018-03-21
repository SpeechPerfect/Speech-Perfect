import React, { Component } from 'react'
import { Text, ScrollView, View, AsyncStorage as store, StyleSheet, Button} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import Login from '../components/Login'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      id: null
    }

    this.logout = this.logout.bind(this)
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

  logout(){
    store.setItem('user', '')
    this.props.navigation.navigate('login')
  }

  getSpeeches() {
    axios.get(`http://localhost:5000/api/speech/${this.state.id}`)
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
      <ScrollView style={styles.container}>
      {id === null &&
      <Text>Loading...</Text>}
      {id &&
        speeches.map(speech => {
          return (
            <View key={speech.id}>
            <Text>
            {speech.title}
            </Text>
            </View>
          )
        }
      )}
      <Button  title='logout' onPress={this.logout}/>
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
