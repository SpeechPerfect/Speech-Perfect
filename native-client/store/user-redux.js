// import axios from 'axios'

//INITIAL STATE
const user = 0

// ACTION TYPE
const SET_USER_ID = 'SET_USER_ID'

// ACTION CREATOR
export const setUserAction = id => {
  return {
    type: SET_USER_ID,
    id
  }
}

// REDUCER

function reducer(state = user, action) {
  switch (action.type) {
    case SET_USER_ID:
      return action.id
    default:
      return state
  }
}

export default reducer
