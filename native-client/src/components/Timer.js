import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import styles from '../../assets/stylesheet'

export default class Timer extends Component {
    constructor(){
        super()
    }

    _renderTimers() {
        let { duration } = this.props
        let seconds, minutes, hours

            miliseconds = Math.floor(duration / 100) % 10 || 0
            seconds = Math.floor(duration / 1000) % 60 || 0
            minutes = Math.floor(duration / 60000) % 60
            hours = Math.floor(duration / 360000) % 60

            miliseconds = miliseconds.toString().slice(0,1)
            if (minutes > 0) seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
            if (hours > 0) minutes = minutes.length === 1 ? '0'+minutes : minutes

      return (
        <View >

          <Text style={styles.timerDuration}>
        { hours ?
            `${hours}:${minutes}:${seconds}`
            :
            minutes ?
                `${minutes}:${seconds}`
                :
                `${seconds}.${miliseconds}`
        }
        </Text>

        </View>
      )
    }


  render() {
    return  (
        <View style={{flex: 1}}>
            <View style={styles.stopwatch}>
             </View>
            <View style={styles.timerContainer}>
                {this._renderTimers()}
            </View>
        </View>

    )
  }
}
