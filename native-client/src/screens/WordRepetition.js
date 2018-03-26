import React, { Component } from 'react'
import { Text, ScrollView, Button, View, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'
<<<<<<< HEAD
import styles from '../../assets/stylesheet'
import SingleSpeechThumbnail from '../components/SingleSpeechThumbnail'
=======

>>>>>>> master

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
    headerLeft: <Button title="" color="white" onPress={() => {}} />,
    // headerTintColor: "rgb(252,197,76)',
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
      .then(res => {
        //set state to first ten words returnd from the backend
        alternatives = res.data.slice(0,10).map(word => <Text style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'Cochin'}}>{word}, </Text>)
        this.setState({selectedWord: word, alternatives: alternatives})
      })
      .catch(err => console.log(err))
  }


  renderSpeech() {
    let wordCount = {}
    let speech = this.state.speech.toLocaleLowerCase().split(/\s+/)
    // let speechArr = this.state.speech.split(' ')
    let result = []
    let badWords = ['A little bit', 'just', 'My topic is', "I've been asked to speak about", 'so', 'actually', 'basically', 'supposedly', 'totally','you know', 'like I said']
      .map(x => x.toLocaleLowerCase().split(/\s+/))
    let excludedWords = []
    for(let i = 0; i < speech.length; i++){
      wordCount[speech[i]] = (wordCount[speech[i]] || 0) + 1
    }
  
    // Match pattern from value at i
    const match = (pattern, value, start=0) => {
      const end = pattern.length
      const matched = []
      for (let i = 0; i != end; ++i)
        if (pattern[i] !== value[start + i])
          return false
        else
          matched.push(pattern[i])
      return matched
    }

    const push = (...args) => {
      result.push(...args)
    }

    const styled = style => ({ text }) =>
      text.map(
        word =>
          <TouchableOpacity
            onPress={() => {this.thesaurus(word)}}>
            <Text style={style}>{
              word
            } </Text>
          </TouchableOpacity>
      )

    const red = styled({fontSize: 21,color:'red',fontFamily: 'Avenir-Roman'})
    const orange = styled({fontSize: 21,style:'orange',fontFamily: 'Avenir-Roman'})
    const black = styled({fontSize: 22,fontFamily: 'Avenir-Roman'})

    let i
    speech: for(i = 0; i < speech.length; i++) {
      for(let x = 0; x < badWords.length; x++) {
        const phrase = badWords[x]
        const matched = match(phrase, speech, i)

        // Bad phrase match
        if (matched) {
          push({ style: red, text: matched })
          i += matched.length - 1
          continue speech
        }
      }

      const word = speech[i], text = [word]
      // No bad words matched, check for a repeated word match
      if (wordCount[word] > 5) {
        push({ style: orange, text })
        continue speech
      }
      // Otherwise, render the word in black.
      push({ style: black, text })
    }
    return result.map(result => result.style(result))
  }

  render() {
    return (
      <View>
        {this.state.alternatives.length ? 
        <Card>      
            <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 20}}  onPress={() => this.setState({alternatives: []}) }><Text>X</Text></TouchableOpacity>
            <Text style={{fontSize: 25,fontWeight: 'bold'}}>Synonoms for {this.state.selectedWord}</Text>
            <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>{this.state.alternatives}</View>
          </Card> 
          : 
          <Text></Text>}

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
