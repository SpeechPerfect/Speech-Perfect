import React from 'react'
import { View } from 'react-native'
import styles from '../../assets/stylesheet'
import RenderTimers from './TimerRender.js'

 const Timer = (props) => {
    const duration = props.duration
    return  (
        // <View style={{flex: 1}}>
            <View style={styles.timerContainer}>
              <RenderTimers duration={duration} />
            </View>
        // </View>
    )
}

export default Timer
