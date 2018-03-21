import React, { Component } from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';

export default class Timer extends Component {
    constructor(){
        super()
    }

    _renderTitle() {
      return (
        <View style={styles.stopwatch}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }

    _renderTimers() {
        let { duration } = this.props
      return (
        <View >

          <Text style={styles.time}>
        { minutes ? `${minutes}:` + `${seconds}` : '' }
        </Text>

        </View>
      )
    }


  render() {
    return  (
        <View style={styles.stopwatch}>
            {this._renderTitle()}
            <View style={styles.timer}>
                {this._renderTimers()}
            </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
    stopwatch: {
        flex: 1,
        // borderBottomWidth: 0.5,
        alignItems: 'center',
        width: '100%',
        // justifyContent: 'flex-end',
        // paddingTop: 20,
        // paddingBottom: 10,
        // backgroundColor: '#F9F9F9'
    },
    // timerWrapper: {
    //     backgroundColor: '#FFFFFF'
    // },
    timer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#202020',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    time: {
        fontSize: 50,
        color: 'white',
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600',
        color: 'white',
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
    },
    //  top: {
    //     flex: 1
    //   },
})




