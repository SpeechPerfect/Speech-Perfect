import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

export default class Testing extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: true
  };


  test() {
    fetch('http://localhost:5000/api/watson', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      // }),
    })
    .then(result => {
      let results = result._bodyText
      console.log('front', results)
      return results
    })
<<<<<<< HEAD
    .then(result => result)
=======
    .then(result => console.log(result[0]))
>>>>>>> 9eae312176db81a7d628837eb715463b4a3773a5
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.test} title="PRESS ME" />
      </View>
    )
  }z
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,1)',
  },
})
