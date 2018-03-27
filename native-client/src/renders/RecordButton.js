import React from 'react'
import { View, TouchableWithoutFeedback} from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import styles from '../../assets/stylesheet'

const RecordButton = (props) => {
  return (
  // <View style={styles.backgroundCircle}>
    <TouchableWithoutFeedback onPress={props.press}>
        {/* <View style={styles.innerBackgroundCircle}>
          //<View style={{ flex: 1, marginLeft: -14, marginTop: -14}}> */}
            {/* <MaterialCommunityIcons
            name={'record'}
            size={67}
            color={'red'}
            /> */}
             <Ionicons
            name={'ios-mic'}
            size={67}
            color={'#12092f'}
            />
        {/* </View>
      </View> */}
    </TouchableWithoutFeedback>
  // </View>
  )
}

export default RecordButton
