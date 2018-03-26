import React from 'react'
import { Button, AsyncStorage as store } from 'react-native'

export default function Logout (props) {
    return (
      <Button title='logout' onPress={() => {
        store.removeItem('user')
        props.navigation.navigate('SignedOut')
      }} />
    )
}
