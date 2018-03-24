import React, { Component } from 'react'
import thesaurus from 'thesaurus'
import { Text, ScrollView, View, Button, AsyncStorage as store} from 'react-native'
import { Card } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import SingleSpeechThumbnail from '../components/SingleSpeechThumbnail'


export default class WordRepetition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speech: ''
    }
    this.renderSpeech = this.renderSpeech.bind(this)
  }

  static navigationOptions = {
    title: 'Profile',
    headerLeft: <Button title='' color='white' onPress={() => {}} />,
    // headerTintColor: 'rgb(252,197,76)',
  }

  componentDidMount(){
      console.log(this.props)
    userId = this.props.navigation.state.params.userId
    speechId = this.props.navigation.state.params.speechId
    axios.get(`${API_ROOT}/api/speech/watson-data/${speechId}`)
        .then(speech => {
          console.log(speech)
          this.setState({
            speech: speech.data.transcript
        })
        })
        .catch(err => console.log(err))
  }


  thesaurus(){

  }

  renderSpeech(){
    let speechObj = {}
    let speechArr = this.state.speech.split(' ')
    let result = []
    let excludedWords = []
    for(let i = 0; i < speechArr.length; i++){
        
        if(speechObj[speechArr[i]] >= 0){
            speechObj[speechArr[i]]++
        }else{
            speechObj[speechArr[i]] = 1
        }
    }
    console.log(speechObj)
    for(let i = 0; i < speechArr.length; i++){
       if(speechObj[speechArr[i]] > 5) {
           result.push(<Text style={{color:'red'}}> {speechArr[i]} </Text>)
       }else{
        result.push(<Text>{speechArr[i]} </Text>)
       }
    }
   return result
  }

  render() {
    return (
      <View>
        <Card containerStyle={{padding: 0}} >
        <View style={{flexDirection: 'row'}}>
            {this.state.speech ? this.renderSpeech() : <Text>''</Text>}
        </View>
        </Card>
      </View>
    )
  }
}
