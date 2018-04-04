// import axios from 'axios'

//INITIAL STATE
const loading = false

// ACTION TYPE
const IS_LOADING = 'IS_LOADING'

// ACTION CREATOR
export const isLoadingAction = isLoading => {
  return {
    type: IS_LOADING,
    isLoading
  }
}

// REDUCER

function reducer(state = loading, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export default reducer
