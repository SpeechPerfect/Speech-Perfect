import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import API_ROOT from '../../IP_addresses.js'


export default class SingleReport extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/api/watson-api/1`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log('grabbing', res)
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
    <View style={styles.resultsContainer}>
      <ScrollView style={styles.resultsTopContainer}>
        <Text style={styles.text}> Will put results here </Text>
      </ScrollView>

      <View style={styles.resultsBottomContainer}>
      <MaterialCommunityIcons
            name={'play-circle-outline'}
            size={67}
            color={'white'}
            />
        <View >
          <Text style={styles.text}> Will put transcript here </Text>
        </View>
      </View>

    </View>
    )
  }
}

