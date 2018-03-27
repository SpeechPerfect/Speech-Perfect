import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import Expo from 'expo'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import API_ROOT from '../../IP_addresses'
import styles from '../../assets/stylesheet'
import { LinearGradient } from 'expo';

let soundObject

export default class ReplayAudio extends Component {
  static navigationOptions = {
    title: 'SingleReport'
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.speechId,
        awsData: null,
        url: this.props.url,
        playing: false,
        started: false
    }
    this.navigateToTranscript = this.navigateToTranscript.bind(this)
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/api/speech/aws-data/${this.state.speechId}`)
    .then(res => res.data)
    .then((awsData) => {
      this.setState({
        awsData
      })
    })
  }

  _playAudio = async () => {
    let soundUrl = this.state.url ? this.state.url : this.state.awsData.url
    soundObject = new Expo.Audio.Sound()

    this.setState({playing: true, started: true})
    try {
      await soundObject.loadAsync({ uri: soundUrl})
      await soundObject.playAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  _pauseAudio = async () => {
    let playing = this.state.playing

    if (playing) {
      this.setState({playing: false})
      try {
        await soundObject.pauseAsync()
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    } else {
      this.setState({playing: true})
      await soundObject.playAsync()
    }
  }

  _replayAudio = async () => {
        let playing = this.state.playing

        if (playing) {
          this.setState({playing: false})
          try {
            await soundObject.replayAsync()
            soundObject.playAsync()
          } catch (error) {
            console.log(error)
          }
        } else {
          this.setState({playing: true})
          await soundObject.replayAsync()
          await soundObject.playAsync()
        }
      }

    navigateToTranscript(){
      this.props.navigation.navigate('TranscriptScreen', { speechId: this.props.navigation.state.params.speechId, userId: this.props.navigation.state.params.userId})
    }

  render() {
    console.log('DATA IS', this.props.url)
    return (
    <View style={{flex:1, width:'90%', alignSelf:'center',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius:10, marginTop:100}}>
     <View style={{flex:1}}>
        <View style={{alignSelf:'center', width:'100%', justifyContent:'center', height:150, alignItems:'center', backgroundColor:'#c8d3e5',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius:10}}>
        <LinearGradient
          colors={['#ccb144','#b88c03']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 150,
            borderRadius:10
          }}
        />
          {!this.state.started &&
          <TouchableHighlight onPress={this._playAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={90}
              color={'white'}
              />
            </TouchableHighlight>
          }
          {this.state.started && this.state.playing &&
            <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'pause-circle-outline'}
              size={90}
              color={'white'}
              />
            </TouchableHighlight>
          }
           {this.state.started && !this.state.playing &&
          <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={90}
              color={'white'}
              />
            </TouchableHighlight>
          }
        </View>
      </View>
      <TouchableHighlight style={{flex:1 ,marginTop:50, flexDirection:'row', alignSelf:'center'}} onPress={this.navigateToTranscript}><Text style={{fontSize: 25,fontWeight: 'bold'}}>View Transcript</Text></TouchableHighlight>
    </View>
    )
  }
}

/* <BarChart
data={{
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}}
width={Dimensions.get('window').width}
height={220}
chartConfig={{
  backgroundColor: 'red',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'lightgrey',
  marginRight:20,
  paddingRight:20,
  marginLeft:-20,
  paddingLeft:-20,
  color: (opacity = 1) => `#12092f`,
  style: {
    borderRadius: 16,
    marginRight:20,
    marginLeft:-20,
  paddingLeft:-20,
  paddingRight:20,
  }
}}
style={{
  marginVertical: 8,
  borderRadius: 16,
  marginRight:20,
  paddingRight:20,
  // marginLeft:-5,
  // paddingLeft:-5,
}}        /> */
