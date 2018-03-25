import React, { Component } from 'react'
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableHighlight} from 'react-native'
import styles from '../../assets/stylesheet'
import { MaterialCommunityIcons } from '@expo/vector-icons'

class ReplayAudio extends Component {
  constructor(props) {
    super()
    this.state = {
      working: false,
    }
    this.forceChange = this.forceChange.bind(this)

  }

  play = () => {
    this.props.playAudio()
    this.setState(this.state)
    return this.forceChange()
  }

  forceChange(){
    this.setState({working: !this.state.working})
 }

  render() {
    console.log(this.state)
    return (
      <View style={styles.audioFeedback}>
      {this.props.started &&
        <TouchableHighlight onPress={this.props.replayAudio}>
            <MaterialCommunityIcons
            name={'replay'}
            size={30}
            color={'#12092f'}
            style={{marginTop:5}}
            />
          </TouchableHighlight>
        }
        {!this.props.started &&
        <TouchableHighlight onPress={this.play}>
            <MaterialCommunityIcons
            name={'play-circle-outline'}
            size={67}
            color={'#12092f'}
            />
          </TouchableHighlight>
        }
        {this.props.started && this.props.playing &&
          <TouchableHighlight onPress={this.props.pauseAudio}>
            <MaterialCommunityIcons
            name={'pause-circle-outline'}
            size={67}
            color={'#12092f'}
            />
          </TouchableHighlight>
        }
        {this.props.started && !this.props.playing &&
        <TouchableHighlight onPress={this.props.pauseAudio}>
            <MaterialCommunityIcons
            name={'play-circle-outline'}
            size={67}
            color={'#12092f'}
            />
          </TouchableHighlight>
        }
      </View>
    )
  }
}


export default ReplayAudio
