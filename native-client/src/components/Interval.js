import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native'

export default class Interval extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isClicked: false,
      intervals: 0
    }
  }

  handleStart = () => {
    this.setState({begin: true})
    let start = (new Date()).getTime()
    this.startFrame(start)
    // this.startFrame(this.state.intervals * 1000)
  }

  startFrame = (startTime) => {
    this.startTime = startTime
    requestAnimationFrame(this.frame)
  }

  frame = (time) => {

      // if (!this.endTime && !this.state.isClicked) this.endTime = time - this.startTime
        const duration = new Date().getTime() - this.startTime
        this.setState({duration})
      if (this.state.duration > 0 && !this.state.isClicked) {
        requestAnimationFrame(this.frame)
      }

      // if(!this.state.duration && !this.state.isClicked) {
      //   let newTime = this.state.intervals.length ? this.state.intervals : 0
      //   window.setTimeout(() => {
      //     this.setState({duration: newTime * 1000})
      //     this.endTime = null
      //     this.startFrame(this.state.duration)
      //     this.setState({intervals: this.state.intervals.slice(1)})
      //   }, 100)
      // }

      // if (isNaN(this.state.duration) && !this.state.intervals.length && this.state.begin) {
      //   this.setState({duration: 0})
      // }
  }

  handlePause = () => {
    if(!this.isClicked) {
      if (this.state.duration > 0) {
        this.startFrame(this.state.duration)
      } else {
        let newTime = this.state.intervals.length ? this.state.intervals : 0
        window.setTimeout(() => {
          this.setState({duration: newTime * 1000, intervals: this.state.intervals.slice(1)})
          this.endTime = null
          this.startFrame(this.state.duration)
        }, 900)
      }
    }
    this.setState({isClicked: !this.state.isClicked})
  }

  render() {
    return (
      <View style={styles.container}>
        {
          !this.state.begin ?
          (<TouchableHighlight
              onPress={this.handleStart}
              style={styles.button}>
            <Text style={styles.buttonText}>
              Start
            </Text>
          </TouchableHighlight>) : null
        }
        <View>
          <Text style={{color: 'red', fontSize: 64, marginLeft: -10}}>
            { !this.state.begin ?
                null :
                (this.state.duration / 1000).toFixed(1)
            }
          </Text>
        </View>
        {/* { !this.state.isClicked && this.state.intervals && this.state.intervals[0]
          && this.state.begin ?
            (<Text style={styles.textStyle}>{this.state.intervals[0].name}</Text>) : null
        } */}
        <TouchableHighlight onPress={this.handlePause} style={styles.button2}>
            <Text style={styles.buttonText}>
              {this.state.isClicked ? "Start" : "Pause"}
            </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "#8b475d",
    borderColor: "#db7093",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  button2: {
    height: 50,
    width: 100,
    backgroundColor: "#db7093",
    borderColor: "#db7093",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: '#8b475d',
    fontSize: 32,
    alignSelf: 'center'
  }
})
