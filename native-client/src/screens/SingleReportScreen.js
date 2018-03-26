import React, { Component } from 'react'
import { View } from 'react-native'
import { SpeechList, ReplayAudio } from '../components'
import styles from '../../assets/stylesheet'

export default class SingleReportScreen extends Component {
  static navigationOptions = {
    title: 'SingleReport',
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.navigation.state.params.speechId,
        url: this.props.navigation.state.params.url
    }
  }

  render() {
    console.log('DATA IN SINGLE REPORT IS', this.state.url)
    return (
    <View style={styles.resultsContainer}>
      {this.state.speechId &&
        <View style={styles.resultsContainer}>
          <SpeechList speechId={this.state.speechId} />
        </View>
      }
     <ReplayAudio speechId={this.state.speechId} navigation={this.props.navigation} url={this.state.url} />
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
