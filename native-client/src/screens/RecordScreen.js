import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, AsyncStorage as asyncStore } from 'react-native'
import { setUserAction } from '../../store'
import { Recorder } from '../components'
import styles from '../../assets/stylesheet'
import { Spinner } from '../components/LoadingSpinner'

class RecordScreen extends Component {
  static navigationOptions = {
    title: 'Record'
  }

  componentDidMount() {
    asyncStore
      .getItem('user')
      .then(user => JSON.parse(user))
      .then(userData => {
        this.props.setUserAction(userData.id)
      })
  }

  render() {
    const { loading } = this.props
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {' '}
              Your speech is being analyzed{' '}
            </Text>
            <Spinner />
          </View>
        )}
        {!loading && (
          <View style={styles.container}>
            <Recorder navigation={this.props.navigation} />
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserAction: id => dispatch(setUserAction(id))
  }
}

const RecordScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  RecordScreen
)

export default RecordScreenContainer
