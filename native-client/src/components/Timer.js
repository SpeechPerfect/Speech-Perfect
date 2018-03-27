import React from 'react'
import { View } from 'react-native'
import styles from '../../assets/stylesheet'
import { TimerRender } from '../renders'

 const Timer = (props) => {
    const duration = props.duration
    return  (
        // <View style={{flex: 1}}>
            <View style={styles.timerContainer}>
              <TimerRender duration={duration} />
            </View>
        // </View>
    )
}

export default Timer
