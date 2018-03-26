import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import RenderTimers from './TimerRender.js'

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

  render() {
      let duration = this.props.duration
    return  (
        <View style={{flex: 1}}>
            <View style={styles.stopwatch} />
            <View style={styles.timer}>
              <RenderTimers duration={duration} />
            </View>
        </View>

    )
  }
}

