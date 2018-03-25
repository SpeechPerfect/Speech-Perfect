import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
// import { ExpoLinksView } from '@expo/samples'
import  {Signup}  from '../components'
import styles from '../../assets/stylesheet'

function SignupScreen (props) {

  return (
    <Signup navigation={props.navigation} />
  )
}

export default SignupScreen
