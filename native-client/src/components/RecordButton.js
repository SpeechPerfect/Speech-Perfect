import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import Timer  from './Timer'
// import {Uploader} from './'


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
    backgroundColor: 'white'
  },
  backgroundCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 27.5,
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
