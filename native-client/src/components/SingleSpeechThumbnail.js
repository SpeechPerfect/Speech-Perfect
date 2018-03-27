import React from 'react'
import { Text, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'

const readableDate = (str) => {
  let amPm = 'AM'
  let dateObj = new Date(str)
  let formattedDate = dateObj.toString().slice(4, -18)

  let finalStr = formattedDate.slice(0, 6) + ',' + formattedDate.slice(6, 11) + ' at '

  let time = formattedDate.split(' ')[3]
  let [hoursStr, minsStr] = time.split(':')
  let hours = Number(hoursStr)
  if (hours > 12) {
    hours = hours % 12
    amPm = 'PM'
  }
  return finalStr + hours + ':' + minsStr + amPm
}

export function SingleSpeechThumbnail (props) {
  const { speech } = props

    return (
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{speech.title}</Text>
        <Text style={styles.resultsCreatedText}>Created {readableDate(speech.createdAt)}</Text>
      </ScrollView>
    )
}

export default SingleSpeechThumbnail
