//INITIAL STATE
const speech = 0

// ACTION TYPE
const SET_SPEECH_ID = 'SET_SPEECH_ID'
const GET_SPEECHES = 'GET_SPEECHES'

// ACTION CREATOR
export const setSpeechAction = id => {
  return {
    type: SET_SPEECH_ID,
    id
  }
}

// REDUCER

function reducer(state = speech, action) {
  switch (action.type) {
    case SET_SPEECH_ID:
      return action.id
    default:
      return state
  }
}

export default reducer
