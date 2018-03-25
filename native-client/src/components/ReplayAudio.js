import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import Expo from 'expo'
import styles from '../../assets/stylesheet'
import axios from 'axios'
import API_ROOT from '../../IP_addresses'

import { MaterialCommunityIcons } from '@expo/vector-icons'
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
        playing: false,
        started: false
    }
    this.navigateToTranscript = this.navigateToTranscript.bind(this)
  }

  componentDidMount() {
    this.setState({speechId: this.props.speechId})
    axios.get(`${API_ROOT}/api/speech/aws-data/${this.state.speechId}`)
    .then(res => res.data)
    .then((awsData) => {
      this.setState({
        awsData
      })
    })
  }

  _playAudio = async () => {
    soundObject = new Expo.Audio.Sound()

    this.setState({playing: true, started: true})
    try {
      await soundObject.loadAsync({ uri: `${this.state.awsData.url}`})
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
      this.props.navigation.navigate('WordRepetition', { speechId: this.props.navigation.state.params.speechId, userId: this.props.navigation.state.params.userId})
    }

  render() {
    console.log('DATA IS', this.state.awsData)

    return (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsBottomContainer}>
        <View style={styles.audioFeedback}>
          {!this.state.started &&
          <TouchableHighlight onPress={this._playAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
          }
          {this.state.started && this.state.playing &&
            <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'pause-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
          }
           {this.state.started && !this.state.playing &&
          <TouchableHighlight onPress={this._pauseAudio}>
              <MaterialCommunityIcons
              name={'play-circle-outline'}
              size={67}
              color={'#12092f'}
              />
            </TouchableHighlight>
          }
          <TouchableHighlight onPress={this.navigateToTranscript}><Text style={{fontSize: 25,fontWeight: 'bold'}}>View Transcript</Text></TouchableHighlight>

        </View>
        <View style={styles.transcript}>
        {/* {this.state.speechId &&
          <Text style={{color: 'white', fontSize: 30}}> {speech.watsonReport.transcript} </Text>
        } */}
        </View>
      </View>
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

// import React, { Component } from 'react'
// import { StyleSheet, Button, Text, View, Image, TextInput, TouchableHighlight} from 'react-native'
// import Expo from 'expo'
// import styles from '../../assets/stylesheet'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import axios from 'axios'
// import API_ROOT from '../../IP_addresses'

// let soundObject


// class ReplayAudio extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//         speechId: null,
//         awsData: null,
//         playing: false,
//         started: false,
//     }
//   }

//   componentDidMount() {
//     this.setState({speechId:this.props.speechId})
//     axios.get(`${API_ROOT}/api/speech/aws-data/${this.state.speechId}`)
//     .then(res => res.data)
//     .then((awsData) => {
//       this.setState({
//         awsData
//       })
//     })
//   }

//   _playAudio = async () => {
//     soundObject = new Expo.Audio.Sound()
//     this.setState({playing: true, started: true})

//     try {
//       await soundObject.loadAsync({ uri: `${this.state.awsData.url}`})
//       await soundObject.playAsync()
//     } catch (error) {
//         console.log(error)
//     }
//   }

//   forceChange(){
//     this.setState({working: !this.state.working})
//  }
//   _pauseAudio = async () => {
//     let playing = this.state.playing

//     if (playing) {
//       this.setState({playing: false})
//       try {
//         await soundObject.pauseAsync()
//       } catch (error) {
//         console.log(error)
//       }
//     } else {
//       this.setState({playing: true})
//       await soundObject.playAsync()
//     }
//   }
//   _replayAudio = async () => {
//     let playing = this.state.playing

//     if (playing) {
//       this.setState({playing: false})
//       try {
//         await soundObject.replayAsync()
//         soundObject.playAsync()
//       } catch (error) {
//         console.log(error)
//       }
//     } else {
//       this.setState({playing: true})
//       await soundObject.replayAsync()
//       await soundObject.playAsync()
//     }
//   }

//   render() {
//     console.log('in Replay Audio', this.state)
//     return (
//       <View style={styles.audioFeedback}>
//       {this.state.started &&
//         <TouchableHighlight onPress={this.state._replayAudio}>
//             <MaterialCommunityIcons
//             name={'replay'}
//             size={30}
//             color={'#12092f'}
//             style={{marginTop:5}}
//             />
//           </TouchableHighlight>
//         }
//         {!this.state.started &&
//         <TouchableHighlight onPress={this._playAudio}>
//             <MaterialCommunityIcons
//             name={'play-circle-outline'}
//             size={67}
//             color={'#12092f'}
//             />
//           </TouchableHighlight>
//         }
//         {this.state.started && this.state.playing &&
//           <TouchableHighlight onPress={this.state._pauseAudio}>
//             <MaterialCommunityIcons
//             name={'pause-circle-outline'}
//             size={67}
//             color={'#12092f'}
//             />
//           </TouchableHighlight>
//         }
//         {this.state.started && !this.state.playing &&
//         <TouchableHighlight onPress={this.state._pauseAudio}>
//             <MaterialCommunityIcons
//             name={'play-circle-outline'}
//             size={67}
//             color={'#12092f'}
//             />
//           </TouchableHighlight>
//         }
//       </View>
//     )
//   }
// }


// export default ReplayAudio
