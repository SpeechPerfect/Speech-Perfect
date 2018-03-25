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
    backgroundColor: '#12092f',
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
    flexDirection: 'row',
  },
  transcript: {
    backgroundColor: 'white',
  },
  text: {
    fontFamily:'Avenir-Book',
    fontSize: 20,
    color: '#12092f',
    fontWeight: 'bold',
  },
  resultsText: {
    fontFamily:'Avenir-Book',
      fontSize: 20,
    color: 'white',
  },
  resultsCreatedText: {
    fontFamily: 'Avenir-Book',
    fontSize: 13,
    color: 'white',
  }
})

export default styles
