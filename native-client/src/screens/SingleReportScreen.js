import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, TouchableHighlight, Text } from 'react-native'
import { SpeechList, ReplayAudio } from '../components'
import styles from '../../assets/stylesheet'
import {Spinner} from '../components/LoadingSpinner'

class SingleReportScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
        speechId: this.props.speech,
        url: this.props.url
    }
  }
  renderSpinner() {
    return (
    <View>
      <Text> Your report is currently loading </Text>
      <Spinner size="large" />
    </View>
    )
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
    const { speechId } = this.state
    return (
    <View style={styles.resultsContainer}>
     {/* {  this.props.loading && this.renderSpinner } */}
     { this.renderSpinner() }
      <View>
          {this.renderHeader()}
      </View>
      {!!speechId &&
      <View style={styles.resultsContainer}>
        <View style={styles.resultsContainer}>
          <SpeechList speechId={this.props.speech} />
        </View>
    <ReplayAudio speechId={this.props.speech} navigation={this.props.navigation} url={this.props.url} />
    </View>}
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    speech: state.speech,
    url: state.url
  }
}

const SingleReportScreenContainer = connect(mapStateToProps)(SingleReportScreen)

export default SingleReportScreenContainer


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
//style={{
  marginVertical: 8,
  borderRadius: 16,
  marginRight:20,
  paddingRight:20,
  // marginLeft:-5,
  // paddingLeft:-5,
}}        /> */}
