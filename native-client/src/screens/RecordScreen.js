import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator } from 'react-native'
import  {Recorder}  from '../components'
import styles from '../../assets/stylesheet'

class RecordScreen extends Component {
    static navigationOptions = {
      title: 'Record',
    };

  render() {
    const { loading } = this.props
    return (
      <View style={styles.container}>
      {loading && <View style={styles.container}>
      <ActivityIndicator />
    </View>}
      {!loading && <View style={styles.container}>
           <Recorder navigation={this.props.navigation} />
      </View>}
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

const RecordScreenContainer = connect(mapStateToProps)(RecordScreen)

export default RecordScreenContainer

