import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'

const styles = StyleSheet.create({
  time: {
    fontSize: 50,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: Platform.OS === 'android' ? 'Courier New' : 'Helvetica Neue',
    color: '#12092f'
  }
})

const DigitsRender = props => {
  let { minutes, hours, seconds, milliseconds } = props.time
  minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes
  seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
  milliseconds = milliseconds.toString().slice(0, 2)
  if (minutes.toString() === 'NaN') minutes = '00'

  let outStr
  if (hours) outStr = `Way too long`
  else outStr = `${minutes}:${seconds}.${milliseconds}`

  return (
    <View>
      <Text style={styles.time}>{outStr}</Text>
    </View>
  )
}

const TimerRender = props => {
  let { duration } = props
  let seconds, minutes, hours, milliseconds

  hours = Math.floor(duration / 3600000) || 0
  minutes = Math.floor(duration / 60000) % 60 || 0
  seconds = Math.floor(duration / 1000) % 60 || 0
  milliseconds = duration % 1000 || '00'

  let time = { hours, minutes, seconds, milliseconds }

  return <DigitsRender time={time} />
}

export default TimerRender
