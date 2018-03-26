import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import {SpeechList} from '../components'
import styles from '../../assets/stylesheet'
import ReplayAudio from '../components/ReplayAudio'

export default class SingleReport extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.navigation.state.params.speechId,
    }
  }
  renderHeader() {
    return (
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderLogoutContainer}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('profile')}>
          <Text> Profile </Text>
        </TouchableHighlight>
        </View>
        <View style={styles.singleReportHeader}>
        <Text style={styles.text}>Report</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
    <View style={styles.resultsContainer}>
      <View>
          {this.renderHeader()}
      </View>
      {this.state.speechId &&
        <View style={styles.resultsContainer}>
          <SpeechList speechId={this.state.speechId} />
        </View>
      }
     <ReplayAudio speechId={this.state.speechId} navigation={this.props.navigation} />
    </View>
    )
  }
}


{/* <BarChart
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
}}        /> */}
