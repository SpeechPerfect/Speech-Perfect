import axios from 'axios'
import API_ROOT from '../IP_addresses'

//INITIAL STATE
const speeches = []

// ACTION TYPE
const GET_SPEECHES = 'GET_SPEECHES'

// ACTION CREATOR
export const getSpeeches = speeches => {
  return {
    type: GET_SPEECHES,
    speeches
  }
}

// THUNK FUNCTIONS
export const fetchSpeeches = user => dispatch => {
  return axios
    .get(`${API_ROOT}/api/user/${user}`)
    .then(res => dispatch(getSpeeches(res.data)))
    .then(err => console.log(err))
}

// REDUCER

function reducer(state = [], action) {
  switch (action.type) {
    case GET_SPEECHES:
      return action.speeches
    default:
      return state
  }
}

export default reducer
