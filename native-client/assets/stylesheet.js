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
    color: '#12092f',
  },
  resultsCreatedText: {
    fontFamily: 'Avenir-Book',
    fontSize: 13,
    color: '#12092f',
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 500,
    width: 500,
    flex: 1,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 300,
    width: 300,
  },
})

export default styles
