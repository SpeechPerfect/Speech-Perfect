import React, { Component } from 'react'
import {Button, View, StyleSheet, Text, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo'
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons'
import Timer  from './Timer'
import {Uploader} from './'


const recordButton = (props) => {
  return (

  <View style={styles.backgroundCircle}>
    <TouchableWithoutFeedback onPress={props.press}>
        <View style={styles.innerBackgroundCicrcle}>
          <View style={{ flex: 1, marginLeft: -14, marginTop: -14}}>
            <MaterialCommunityIcons
            name={'record'}
            size={67}
            color={'red'}
            // style={{borderColor:'yellow', borderWidth:3, borderRadius:40 }}
            />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </View>
  )
}

export default recordButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'black'
  },
  top: {
    flex: 1,
    backgroundColor: 'black',
        // borderBottom: 15,
    // borderBottomWidth: 3,
    borderColor: 'white',
  },
  startRecording: {
    flexDirection: 'row',
    marginBottom: 13,
    // height: 40,
    // borderRadius: 15,
    // borderColor: '#d6d7da',
    // borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backgroundCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 27.5,
    // marginRight: 10, paddingRight: 10
  },
  innerBackgroundCicrcle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 25,
  }
})
// #F0EFF5
