import React, { Component } from 'react'
import { Text, TouchableHighlight, ScrollView, AsyncStorage as store} from 'react-native'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'

const readableDate = (str) => {
  let dateObj = new Date(str)
  let formattedDate = dateObj.toString().slice(4, -18)

  let finalStr = formattedDate.slice(0, 6) + "," + formattedDate.slice(6, 11) + " at "

  let time = formattedDate.split(' ')[3]
  let hoursAndMins = time.split(':')
  let hours = Number(hoursAndMins[0])
  if (hours > 12) {
    hours = hours % 12
    finalStr = finalStr + hours + ':' + hoursAndMins[1] + ' PM'
  }
  return finalStr
}

export function SingleSpeechThumbnail (props) {

  const { speech, navigation } = props

  console.log(speech.createdAt)

    return (
      <ScrollView style={styles.resultsContainer}>
        <TouchableHighlight onPress= {() => navigation.navigate('SingleReport')}>
        <Text style={styles.text}>{speech.title}</Text>
        </TouchableHighlight>
        <Text style={styles.text}>Created {readableDate(speech.createdAt)}</Text>
      </ScrollView>
    )
}

export default SingleSpeechThumbnail
