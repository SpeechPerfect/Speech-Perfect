import React, { Component } from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';

export default class Timer extends Component {
    constructor(){
        super()
    }

    _renderTitle() {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
      )
    }

    _renderTimers() {
      return (
        <View style={styles.timerWrapper}>
          <Text>00:00.00</Text>
          <Text>00:02.95</Text>
        </View>
      )
    }


  render() {
    return  (

        <View>
            {this._renderTitle()}
            {this._renderTimers()}
        </View>

    )
  }
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#F9F9F9'
    },
    timerWrapper: {
        backgroundColor: '#FFFFFF'
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600'
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
     top: {
        flex: 1
      },
});




