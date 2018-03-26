import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
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
    fontWeight: 'bold',
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
  inputFieldContainer: {
    flex: 1,
    marginTop: 200,
  },
  inputFields: {
    width: 200
  },
  backgroundCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 27.5,
  },
  innerBackgroundCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 25,
  },
  editTitleInput: {
    width: 300.3,
    height: 15.3,
    // fontFamily: "WorkSans",
    fontSize: 20.7,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    marginVertical: 20,
    color: "#ffffff"
  },
  editTitleButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    marginVertical: 20,
  },
  editTitleText: {
    fontSize: 20,
    color: 'rgb(252,197,76)',
    fontWeight: '500',
    marginVertical: 50,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  editTitleContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  stopwatch: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
  },
  timerContainer: {
      width: '100%',
      flex: 1,
      // backgroundColor: '#202020',
      backgroundColor: 'white',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  timerDuration: {
    fontSize: 50,
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
  },
  recorderTopContainer: {
    flex: 1,
    backgroundColor: '#12092f',
    borderColor: 'white',
  },
  startRecordingContainer: {
    flexDirection: 'row',
    marginBottom: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recorderBottomContainer: {
    flex: 2,
    backgroundColor: '#12092f',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  recorderButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  recorderIntroText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  recorderText: {
    color: 'white',
    fontSize: 14,
  },
  facebookHelpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  facebookHelpLink: {
    paddingVertical: 15
  },
  facebookHelpLinkText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    backgroundColor: "#3b5998"
  }
})

export default styles
