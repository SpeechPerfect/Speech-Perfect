import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { WebBrowser } from 'expo'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.container} onPress={() => this.props.navigation.navigate('Record')}>
        {/* <Text textStyle={styles.helpLinkText}> HEY WHERE IS EVERYONE </Text> */}
          <Image style={styles.image} source={{uri: 'https://static1.squarespace.com/static/55673b0ee4b0b18473b61633/t/5996ef8ae4fcb50cf896029e/1503063956103/Public+Speaking+Tips.jpg'}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,1)',
  },
  image: {
   flex: 1,
  },
})
