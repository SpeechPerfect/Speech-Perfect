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
    backgroundColor: '#12092f',
  },
  audioFeedback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  transcript: {
    backgroundColor: '#12092f',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#12092f',
    fontWeight: 'bold',
  },
  createdText: {
    fontFamily: 'Arial',
    fontSize: 13,
    color: '#12092f',
    fontWeight: 'bold',
  }
})

export default styles
