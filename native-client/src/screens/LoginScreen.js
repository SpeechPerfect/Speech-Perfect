import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
// import { ExpoLinksView } from '@expo/samples'
import  {Login, Signup}  from '../components'
import styles from '../../assets/stylesheet'

function LoginScreen (props) {

  return (
    <Login navigation={props.navigation} />
  )
}

export default LoginScreen
