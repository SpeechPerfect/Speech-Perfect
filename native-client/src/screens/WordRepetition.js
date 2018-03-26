import React, { Component } from 'react'
import { Text, View,Button,ScrollView, AsyncStorage as store, TouchableOpacity} from 'react-native'
import { Card } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import SingleSpeechThumbnail from '../components/SingleSpeechThumbnail'



export default class WordRepetition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speech: '',
      alternatives: [],
      slectedWord: ''
    }
    this.renderSpeech = this.renderSpeech.bind(this)
  }

  static navigationOptions = {
    title: 'Profile',
    headerLeft: <Button title='' color='white' onPress={() => {}} />,
    // headerTintColor: 'rgb(252,197,76)',
  }

  componentDidMount(){
    let userId = this.props.navigation.state.params.userId
    let speechId = this.props.navigation.state.params.speechId
    axios.get(`${API_ROOT}/api/speech/watson-data/${speechId}`)
        .then(speech => {
          this.setState({
            speech: speech.data.transcript
          })
        })
        .catch(err => console.log(err))
  }

  thesaurus(word){
    axios.get(`${API_ROOT}/api/speech/thesaurus/${word}`)
      .then(res =>{
        //set state to first ten words returnd from the backend
        alternatives = res.data.slice(0,10).map(word => <Text style={{fontSize: 20,fontWeight: 'bold',fontFamily: 'Cochin'}}>{word}, </Text>)
        this.setState({selectedWord: word, alternatives: alternatives})
      })
      .catch(err => console.log(err))
  }


  renderSpeech(){
    let speechObj = {}
    let speech = this.state.speech.toLocaleLowerCase()
    let speechArr = this.state.speech.split(' ')
    let result = []
    let badWords = ['A little bit', 'just', 'My topic is', "I've been asked to speak about", 'so', 'actually', 'basically', 'supposedly', 'totally','you know', 'like I said'  ]
    let excludedWords = []
    // for(let i = 0; i < speechArr.length; i++){
    //   if(speech.includes(badWords[i].toLowerCase())){
        
    //   }else{
    //       speechObj[speechArr[i]] = 1
    //   }
    // }
    //add words to an object that keeps track of their count
    for(let i = 0; i < speechArr.length; i++){
        if(speechObj[speechArr[i]] >= 0){
            speechObj[speechArr[i]]++
        }else{
            speechObj[speechArr[i]] = 1
        }
    }
    //if word is used more than 5 times suggest alternatives
    for(let i = 0; i < speechArr.length; i++){
      let pushed = false
      for(let x = 0; x < badWords.length; x++){
        if(badWords[x].split(' ').length === 1) {
          if (badWords[x] === speechArr[i]){
            result.push(<TouchableOpacity onPress={() => {this.thesaurus(speechArr[x])}}><Text style={{fontSize: 21,color:'red',fontFamily: 'Avenir-Roman'}}>{speechArr[x]} </Text></TouchableOpacity>)
            pushed = true
          } 
        }else if(badWords[x].split(' ')[0].toLowerCase() === 
                speechArr[i].toLowerCase() && 
                speechArr.slice(i, i + badWords[x].split(' ').length).join(' ') === 
                badWords[x].toLowerCase()){
                  for(let y = i; y <  i + badWords[x].split(' ').length ; y++){
                    result.push(<TouchableOpacity onPress={() => {this.thesaurus(speechArr[i])}}><Text style={{fontSize: 21,color:'red',fontFamily: 'Avenir-Roman'}}>{speechArr[y]} </Text></TouchableOpacity>)
                  }
                  pushed = true
                  i += badWords[x].split(' ').length - 1
         }else if(!pushed && speechObj[speechArr[i]] > 5) {
          pushed = true
            result.push(<TouchableOpacity onPress={() => {this.thesaurus(speechArr[i])}}><Text style={{fontSize: 21,color:'orange',fontFamily: 'Avenir-Roman'}}>{speechArr[i]} </Text></TouchableOpacity>)
         }else if(!pushed){
          pushed = true
            result.push(<TouchableOpacity onPress={() => {this.thesaurus(speechArr[i])}}><Text style={{fontSize: 22,fontFamily: 'Avenir-Roman'}}>{speechArr[i]} </Text></TouchableOpacity>)
        }
      }
    }
   return result
  }

  render() {
    return (
      <View>
        {this.state.alternatives.length ? <Card><Button style={{borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da' }} title='X' onPress={() => this.setState({alternatives: []}) }/><Text style={{fontSize: 25,fontWeight: 'bold'}}>Synonoms for {this.state.selectedWord}</Text><View style={{flexDirection: 'row',flexWrap: 'wrap'}}>{this.state.alternatives}</View></Card> : <Text></Text>}
        
        <Card containerStyle={{padding: 0 , padding: 5}} >
        <ScrollView>
        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
            {this.state.speech ? this.renderSpeech() : <Text></Text>}
        </View>
        </ScrollView>
        </Card>
      </View>
    )
  }
}
