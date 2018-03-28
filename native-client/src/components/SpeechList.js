import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Text, View } from 'react-native'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses.js'
import { LinearGradient } from 'expo';


export default class SpeechList extends Component {
  static navigationOptions = {
    title: 'SingleReport'
  };

  constructor(props) {
    super(props)
    this.state = {
        speechData: {}
    }
  }

  componentDidMount = () => {
    console.log('SPEECH ID IS ', this.props.speechId)
    axios.get(`${API_ROOT}/api/speech/watson-data/${this.props.speechId}`)
    .then((res) => res.data)
    .then((speechData) => {
      console.log('speech data is', speechData)
      this.setState({
        speechData
      })
    })
  }


  renderItems(speechData){
    return speechData.map(data => {
      let label = data[0]
      let value = data[1]
      return(
        <View style={{flexDirection:'row', width:'90%', alignSelf:'center',shadowColor:'black', alignItems:'center', borderRadius:10, height: 60, justifyContent:'space-between', padding:10, marginTop:10}}>
        <LinearGradient
          colors={['#5e4ba0','#413372']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 60,
            borderRadius:10
          }}
        />
          <Text style={{fontFamily:'Futura-Medium',fontSize: 18,color:'white'}}>{label}</Text>
          <Text style={{color:'white', fontSize:22, fontWeight: 'bold'}}>{value}</Text>
        </View>
      )
    })
  }

render() {
  console.log('IN SPEECH LIST, state is ', this.state)

  const { duration, likeCount, umCount, wordCount } = this.state.speechData

  let pace = wordCount / (duration / 60)

  let speechData = [['Duration: ', duration], ['Word Count: ', wordCount], ['Pace: ', pace], ['Um Count: ', umCount], ['Like Count: ', likeCount]]

  return (
    <View style={{flex:1, marginTop: 60}}>
      {
        this.renderItems(speechData)
      }
    </View>
  )
}
}
