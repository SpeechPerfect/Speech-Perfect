import React from 'react'
import { View, StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
    time: {
        fontSize: 50,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Helvetica Neue',
        color: '#12092f'
    }
})

const TimeRender = props => {
    let { minutes, hours, seconds, milliseconds } = props.time
    milliseconds = milliseconds.toString().slice(0, 1) + '0'
    if (minutes > 0) seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
    if (hours > 0) minutes = minutes.length === 1 ? '0' + minutes : minutes

    let outStr
    if (hours) outStr = `${hours}:${minutes}:${seconds}`
    else if (minutes) outStr = `${minutes}:${seconds}.${milliseconds}`
    else outStr = `${seconds}.${milliseconds}`

    return (
        <View >
          <Text style={styles.time}>
            {outStr}
          </Text>
        </View>
    )
}


const TimerLogic = props => {
    let { duration } = props
    let seconds, minutes, hours, milliseconds

    milliseconds = Math.floor(duration / 100) % 10 || 0
    seconds = Math.floor(duration / 1000) % 60 || 0
    minutes = Math.floor(duration / 60000) % 60
    hours = Math.floor(duration / 360000) % 60

    let time = {hours, minutes, seconds, milliseconds}

    return (
        <TimeRender time={time} />
    )
}

export default TimerLogic
