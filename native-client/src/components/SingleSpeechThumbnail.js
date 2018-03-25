import React from 'react'
import { Text, ScrollView } from 'react-native'
import styles from '../../assets/stylesheet'

const readableDate = (str) => {
  let amPm = 'AM'
  let dateObj = new Date(str)
  let formattedDate = dateObj.toString().slice(4, -18)

  let finalStr = formattedDate.slice(0, 6) + ',' + formattedDate.slice(6, 11) + ' at '

  let time = formattedDate.split(' ')[3]
  let hoursAndMins = time.split(':')
  let hours = Number(hoursAndMins[0])
  if (hours > 12) {
    hours = hours % 12
    amPm = 'PM'
  }
  return finalStr + hours + ':' + hoursAndMins[1] + amPm
}

export function SingleSpeechThumbnail (props) {
  const { speech } = props

  console.log('speech in thumbnail is', speech)

    return (
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.text}>{speech.title}</Text>
        <Text style={styles.createdText}>Created {readableDate(speech.createdAt)}</Text>
      </ScrollView>
    )
}

export default SingleSpeechThumbnail
