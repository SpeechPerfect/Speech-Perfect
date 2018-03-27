// import axios from 'axios'

//INITIAL STATE
const url = ''

// ACTION TYPE
const EDIT_URL = 'EDIT_URL'

// ACTION CREATOR
export const editUrlAction = (newUrl) => {
  return {
    type: EDIT_URL,
    newUrl
  }
}

// REDUCER

function reducer (state = url, action) {
  switch (action.type) {
    case EDIT_URL:
      return action.url
    default:
      return state
  }
}

export default reducer
