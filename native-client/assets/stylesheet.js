import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 70,
    color: 'white'
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  resultsTopContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  resultsBottomContainer: {
    flex: 1,
    paddingTop: 15,
  },
  audioFeedback: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  transcript: {
    backgroundColor: 'purple',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'purple'
  }
})

export default styles
