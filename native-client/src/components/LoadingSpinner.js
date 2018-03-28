import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from '../../assets/stylesheet'

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color='#12092f' />
    </View>
  )
}


export { Spinner }
