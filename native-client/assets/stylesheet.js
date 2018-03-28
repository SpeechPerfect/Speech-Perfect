import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    backgroundColor: 'white',
    height: 18
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 70,
    color: 'white'
  },
  navigatorIonicon: {
    // size: 40,
    marginBottom: -5,
    color: '#12092f',
  },
  signUpButtonStyle: {
    marginTop: 20,
    backgroundColor: "purple",
  },
  signUpButtonTextStyle: {
    color: 'purple',
  },
  signInButtonStyle: {
    color: 'purple',
    backgroundColor: "transparent",
  },
  signUpView: {
    paddingVertical: 20,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
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
  transcriptButtonText: {
    paddingLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    color: '#12092f',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    color: '#12092f',
    fontWeight: 'bold',
  },
  resultsText: {
    fontFamily: 'Avenir-Book',
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
    height: 300,
    width: 500,
    flex: 1,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 150,
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
    borderColor: '#12092f',
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
    width: 220,
    height: 50,
    fontSize: 20.7,
    backgroundColor: 'white',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    marginVertical:  5,
    color: 'purple'
  },
  editTitleButton: {
    backgroundColor: '#12092f', borderRadius: 20, paddingVertical: 1, paddingHorizontal: 10, margin:10,
  },
  editTitleButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    marginVertical: 10,
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
    alignItems: 'center',
    width: '90%',
  },
  stopwatch: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
  },
  timerContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
  timerDuration: {
    fontFamily: 'Avenir-Book',
    fontSize: 75,
    color: '#12092f',
  },
  recorderHeader: {
    height: 40,
    borderBottomColor: '#12092f',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  recorderTopContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  recorderBottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  recordButtonContainer: {
    flexDirection: 'column',
    // marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recorderBottomText: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: 20,
  },
  recorderButton: {
    // color: '#12092f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recorderButtons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recorderUpload: {
    backgroundColor: '#12092f',
    borderRadius: 10,
    borderColor: 'white',
    margin: 5,
    padding: 5,
  },
  recorderIntroText: {
    color: '#12092f',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recorderStopText: {
    color: '#12092f',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -5,
  },
  recorderText: {
    color: '#12092f',
    fontSize: 14,
  },
  recorderBuffer: {
    height: 2,
    marginBottom: -2
  },
  whiteText: {
    color: 'white',
  },
  profileHeader: {
    height: 40,
    borderBottomColor: '#12092f',
    borderBottomWidth: 2,
    alignItems: 'flex-end',
    flexDirection: 'row',
    },
  profileHeaderLogoutContainer: {
    // flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  // profileHeaderLogoutText: {
  //   // alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  // },
  profileHeaderTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    marginLeft: 40,

  },
  singleReportHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    marginRight: 40,

  },
  speechesHeader: {
    height: 45,
    backgroundColor: 'lightgrey',
  },
  speechesHeaderContainer: {
    flexDirection: 'row', marginTop: 10,
    alignItems: 'flex-end', justifyContent: 'center',
  },
  speechesHeaderTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  speechesHeaderText: {
    color: '#12092f',
    fontSize: 32,
    fontFamily: 'Geeza Pro',
  },
  speechesHeaderDeleteButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 8,
    marginRight: 5
  },
  speechesSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  speechesListItemContainer: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  speechesListItem: {
    height: 50,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editModalContainer: {
    display: 'flex', height: 800, width: 800, alignItems: 'center', justifyContent: 'center'
  },
  facebookHelpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  facebookHelpLink: {
    paddingVertical: 15
  },
  facebookHelpLinkText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    backgroundColor: '#3b5998'
  },
  transcriptAlternativesText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  transcriptCard: {
    width: 25,
    height: 25,
    borderRadius: 20
  },
  transcriptCardContainer: {
    padding: 5,
  },
  transcriptCardContainerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  transcriptSelectedWord: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  transcriptAlternative: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spinnerStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles
