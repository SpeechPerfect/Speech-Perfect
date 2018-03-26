import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
    stopwatch: {
        flex: 2,
        alignItems: 'center',
        width: '100%'
    },
    timer: {
        width: '100%',
        flex: 1,
        // backgroundColor: '#202020',
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        fontSize: 50,
        color: 'black',
        paddingTop: 5,
        paddingBottom: 5
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600',
        color: 'white'
    },
    mainTimer: {
        fontSize: 60,
        fontWeight: '100',
        borderWidth: 0.5,
        alignSelf: 'center'
    },
    lapTimer: {
        fontSize: 18,
        borderWidth: 0.5,
        alignSelf: 'center'
    }
    //  top: {
    //     flex: 1
    //   },
})

export default class Timer extends Component {
    _renderTitle() { //eslint-disable-line class-methods-use-this
      return (
        <View style={styles.stopwatch}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }

    _renderTimers() {
        // let { miliseconds, seconds, minutes, hours } = this.props
        let { duration } = this.props
        let seconds, minutes, hours

            miliseconds = Math.floor(duration / 100) % 10 || 0
            seconds = Math.floor(duration / 1000) % 60 || 0
            minutes = Math.floor(duration / 60000) % 60
            hours = Math.floor(duration / 360000) % 60

            miliseconds = miliseconds.toString().slice(0, 1)
            if (minutes > 0) seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
            if (hours > 0) minutes = minutes.length === 1 ? '0' + minutes : minutes

      return (
        <View >

          <Text style={styles.time}>
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
            <View style={styles.stopwatch} />
            <View style={styles.timer}>
                {this._renderTimers()}
            </View>
        </View>

    )
  }
}

